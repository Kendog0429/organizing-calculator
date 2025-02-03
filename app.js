function calculateOutreach() {
    const contactGoal = parseInt(document.getElementById("contactGoal").value);
    const contactMethod = document.getElementById("contactMethod").value;
    const contactRate = parseInt(document.getElementById("contactRate").value);
    const flakeFactor = parseInt(document.getElementById("flakeFactor").value);
  
    // Validation for inputs
    if (isNaN(contactGoal) || isNaN(contactRate) || isNaN(flakeFactor)) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }
  
    // Calculate the number of people needed to be contacted to achieve the goal
    let conversations = (contactGoal * contactRate) / 100;
    let adjustedGoal = conversations / (1 - flakeFactor / 100);
  
    // Display the results
    let resultText = `<p><strong>Total People to Contact:</strong> ${contactGoal}</p>`;
    resultText += `<p><strong>Contact Rate:</strong> ${contactRate}%</p>`;
    resultText += `<p><strong>Flake Factor:</strong> ${flakeFactor}%</p>`;
    resultText += `<p><strong>To achieve your goal, you will need to contact about <span style="font-weight: bold">${adjustedGoal.toFixed(0)} people</span> to account for no-shows.</p>`;
  
    // Generate outreach plan based on contact method
    if (contactMethod === "phone") {
      let phonebanks = Math.ceil(adjustedGoal / 200);  // Assuming 200 calls per phonebank
      resultText += `<p><strong>Phonebanking Plan:</strong> You'll need approximately <span style="font-weight: bold">${phonebanks}</span> phonebanks, with 5 phonebankers per phonebank.</p>`;
    } else if (contactMethod === "canvassing") {
      let canvassingShifts = Math.ceil(adjustedGoal / 140);  // Assuming 140 doors per canvasser
      resultText += `<p><strong>Canvassing Plan:</strong> You'll need approximately <span style="font-weight: bold">${canvassingShifts}</span> canvassing shifts.</p>`;
    } else if (contactMethod === "other") {
      resultText += `<p><strong>Other Method:</strong> Based on your contact rate and flake factor, you'll need to adjust your outreach accordingly.</p>`;
    }
  
    // Display final results
    document.getElementById("result").innerHTML = resultText;
  }
  