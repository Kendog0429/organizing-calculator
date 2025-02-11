let totalPeople = 0;
const flakeFactor = 50; // Fixed flake factor (50%)

const contactRates = {
  phone: 8, // Phonebanking rate
  canvassing: 15, // Canvassing rate
  tabling: 25, // Tabling rate
  streetCanvassing: 10, // Street Canvassing rate
};

function nextStep() {
  const intention = document.querySelector('input[name="intention"]:checked').value;
  
  if (intention === 'contactPeople') {
    document.getElementById("firstPage").style.display = "none";
    document.getElementById("contactPeoplePage").style.display = "block";
  } else if (intention === 'turnoutEvent') {
    document.getElementById("firstPage").style.display = "none";
    document.getElementById("turnoutEventPage").style.display = "block";
  }
}

function generateContactPlan() {
  const peopleInput = document.getElementById("totalPeople").value;
  
  if (!peopleInput || peopleInput <= 0) {
    alert("Please enter a valid number of people to contact.");
    return;
  }

  totalPeople = parseInt(peopleInput);
  
  let resultText = `
    <strong>Suggested Breakdown:</strong><br>
    - Phonebanking: ${Math.round(totalPeople * (contactRates.phone / 100))} people<br>
    - Canvassing: ${Math.round(totalPeople * (contactRates.canvassing / 100))} people<br>
    - Tabling: ${Math.round(totalPeople * (contactRates.tabling / 100))} people<br>
    - Street Canvassing: ${Math.round(totalPeople * (contactRates.streetCanvassing / 100))} people<br>
  `;
  
  const adjustedGoal = totalPeople / (100 - flakeFactor);
  resultText += `You need to contact approximately ${Math.round(adjustedGoal)} people to account for the ${flakeFactor}% flake factor.`;

  document.getElementById("result").innerHTML = resultText;
}

function generateTurnoutPlan() {
  const turnoutGoal = document.getElementById("turnoutGoal").value;
  const eventDate = document.getElementById("eventDate").value;
  
  if (!turnoutGoal || !eventDate) {
    alert("Please enter all fields.");
    return;
  }

  const neededRSVPs = turnoutGoal * 2; // Assuming you need twice as many RSVPs
  const adjustedGoal = neededRSVPs / (100 - flakeFactor);

  let resultText = `
    <strong>Event Turnout Plan:</strong><br>
    - You need to turnout ${turnoutGoal} people for your event on ${eventDate}.<br>
    - You need approximately ${Math.round(neededRSVPs)} RSVPs to reach that goal.<br>
    - To account for the ${flakeFactor}% flake factor, you will need to contact approximately ${Math.round(adjustedGoal)} people.<br>
    <strong>Suggested Breakdown:</strong><br>
    - Phonebanking: ${Math.round(adjustedGoal * (contactRates.phone / 100))} people<br>
    - Canvassing: ${Math.round(adjustedGoal * (contactRates.canvassing / 100))} people<br>
    - Tabling: ${Math.round(adjustedGoal * (contactRates.tabling / 100))} people<br>
    - Street Canvassing: ${Math.round(adjustedGoal * (contactRates.streetCanvassing / 100))} people<br>
  `;

  document.getElementById("turnoutResult").innerHTML = resultText;
}
