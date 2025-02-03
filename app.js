// Handle the first page - Enter total number of people
let totalPeople = 0; // This will store the number of people to contact
const flakeFactor = 50; // Fixed flake factor (50%) — assumed

function startCalculator() {
  const peopleInput = document.getElementById("totalPeopleInput").value;

  if (!peopleInput || peopleInput <= 0) {
    alert("Please enter a valid number of people to contact.");
    return;
  }

  totalPeople = parseInt(peopleInput);
  document.getElementById("firstPage").style.display = "none";
  document.getElementById("secondPage").style.display = "block";
}

// Handle the second page - Select contact method and generate the plan
function generatePlan() {
  const contactMethod = document.getElementById("contactMethod").value;

  // Automatically set the contact rate based on the selected method
  let contactRate = 0;
  if (contactMethod === "phone") {
    contactRate = 8;  // Phonebanking (VPB)
  } else if (contactMethod === "canvassing") {
    contactRate = 15;  // Canvassing
  } else if (contactMethod === "tabling") {
    contactRate = 25;  // Tabling
  } else if (contactMethod === "streetCanvassing") {
    contactRate = 10;  // Street Canvassing
  }

  // Calculate the number of people to contact based on the contact rate and the flake factor
  const adjustedGoal = totalPeople / (contactRate / 100);
  const peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);  // 50% flake factor

  let resultText = `
    <strong>Outreach Plan:</strong><br>
    - You need to contact approximately ${Math.round(adjustedGoal)} people.<br>
    - Considering a ${flakeFactor}% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>
  `;

  // Calculate outreach actions based on the selected contact method
  if (contactMethod === "phone") {
    const phonebanks = Math.ceil(peopleToAsk / 100); // 100 people per phonebank
    resultText += `You will need about ${phonebanks} phonebank(s).`;
  } else if (contactMethod === "canvassing") {
    const shifts = Math.ceil(peopleToAsk / 20); // 20 doors per canvassing shift
    resultText += `You will need about ${shifts} canvassing shift(s).`;
  } else if (contactMethod === "tabling") {
    const tables = Math.ceil(peopleToAsk / 50); // 50 people per table
    resultText += `You will need about ${tables} tabling session(s).`;
  } else if (contactMethod === "streetCanvassing") {
    const streetShifts = Math.ceil(peopleToAsk / 30); // 30 people per street canvassing shift
    resultText += `You will need about ${streetShifts} street canvassing shift(s).`;
  }

  // If the "Create an outreach plan" checkbox is checked, show the result
  if (document.getElementById("generatePlanCheckbox").checked) {
    document.getElementById("result").innerHTML = resultText;
  } else {
    document.getElementById("result").innerHTML = "<p>Please check the box to generate an outreach plan.</p>";
  }
}
