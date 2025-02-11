// Handle the new step of selecting intention
function startIntention() {
  const intention = document.querySelector('input[name="intention"]:checked').value;

  if (!intention) {
    alert("Please select an intention.");
    return;
  }

  if (intention === "contactPeople") {
    // Proceed to the general outreach plan
    document.getElementById("intentionPage").style.display = "none";
    document.getElementById("filterMethodPage").style.display = "block";
  } else if (intention === "turnoutPeople") {
    // Proceed with the existing turnout flow
    document.getElementById("intentionPage").style.display = "none";
    document.getElementById("turnoutPeoplePage").style.display = "block";
  }
}

// Toggle contact method options based on checkbox
document.getElementById("filterByContactMethod").addEventListener("change", function() {
  const methodOptions = document.getElementById("contactMethodOptions");
  methodOptions.style.display = this.checked ? "block" : "none";
});

// Proceed to the next step after filtering
function proceedToNextStep() {
  const intention = document.querySelector('input[name="intention"]:checked').value;
  
  if (intention === "contactPeople") {
    // Gather selected contact methods
    const selectedMethods = [];
    if (document.getElementById("phone").checked) selectedMethods.push("phone");
    if (document.getElementById("canvassing").checked) selectedMethods.push("canvassing");
    if (document.getElementById("tabling").checked) selectedMethods.push("tabling");
    if (document.getElementById("streetCanvassing").checked) selectedMethods.push("streetCanvassing");

    // Store selected methods for general outreach plan
    sessionStorage.setItem("selectedMethods", JSON.stringify(selectedMethods));

    // Now proceed to the outreach plan generation page
    document.getElementById("filterMethodPage").style.display = "none";
    document.getElementById("generatePlanPage").style.display = "block";
  } else if (intention === "turnoutPeople") {
    // Continue with the existing logic for turnout
    document.getElementById("filterMethodPage").style.display = "none";
    document.getElementById("turnoutPeoplePage").style.display = "block";
  }
}

// Generate the outreach plan based on contact method or without filter
function generateOutreachPlan() {
  const totalPeople = document.getElementById("totalPeopleInput").value;

  // If filtering by contact method, apply the selected methods
  const selectedMethods = JSON.parse(sessionStorage.getItem("selectedMethods")) || [];
  
  // Default method distribution
  const methodDistribution = {
    phone: 30,      // 30% phonebanking
    canvassing: 30, // 30% canvassing
    tabling: 20,    // 20% tabling
    streetCanvassing: 20  // 20% street canvassing
  };

  // If filtering, only use the selected methods
  if (selectedMethods.length > 0) {
    // Adjust distribution based on selected methods
    const totalSelectedMethods = selectedMethods.length;
    const eachMethodPercentage = 100 / totalSelectedMethods;
    
    selectedMethods.forEach(method => {
      methodDistribution[method] = eachMethodPercentage;
    });
  }

  // Calculate the number of people for each method
  const phonePeople = Math.round((totalPeople * methodDistribution.phone) / 100);
  const canvassingPeople = Math.round((totalPeople * methodDistribution.canvassing) / 100);
  const tablingPeople = Math.round((totalPeople * methodDistribution.tabling) / 100);
  const streetCanvassingPeople = Math.round((totalPeople * methodDistribution.streetCanvassing) / 100);

  // Display the outreach plan
  let resultText = `
    <strong>Outreach Plan:</strong><br>
    - You need to contact ${totalPeople} people.<br>
    - Suggested breakdown:<br>
    - Phonebanking: ${phonePeople} people<br>
    - Canvassing: ${canvassingPeople} people<br>
    - Tabling: ${tablingPeople} people<br>
    - Street Canvassing: ${streetCanvassingPeople} people<br>
  `;

  document.getElementById("result").innerHTML = resultText;
}
