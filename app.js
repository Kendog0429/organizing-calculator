let totalPeople = 0;
const flakeFactor = 50; // Flake factor for RSVPs
const contactRates = {
  phone: 8, // Phonebanking rate
  canvassing: 15, // Canvassing rate
  tabling: 25, // Tabling rate
  streetCanvassing: 10, // Street Canvassing rate
};

// Next step based on user's intention
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

// Generate contact plan based on user input
function generateContactPlan() {
  const peopleInput = document.getElementById("totalPeople").value;
  
  if (!peopleInput || peopleInput <= 0) {
    alert("Please enter a valid number of people to contact.");
    return;
  }

  totalPeople = parseInt(peopleInput);
  const filterByMethod = document.getElementById("filterByMethod").checked;
  const contactMethod = document.getElementById("contactMethod") ? document.getElementById("contactMethod").value : null;
  
  let resultText = "<strong>Suggested Breakdown:</strong><br>";

  if (filterByMethod && contactMethod) {
    // Calculate based on selected method
    const rate = contactRates[contactMethod];
    const peopleToContact = Math.ceil(totalPeople / (rate / 100)); // Calculate how many to contact based on contact method rate
    resultText += `${contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}: ${peopleToContact} people<br>`;
  } else {
    // Calculate for all methods
    Object.keys(contactRates).forEach(method => {
      const rate = contactRates[method];
      const peopleToContact = Math.ceil(totalPeople / (rate / 100)); // Calculate how many to contact based on method rate
      resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${peopleToContact} people<br>`;
    });
  }

  // No flake factor for contact people, just the contact method breakdown
  document.getElementById("result").innerHTML = resultText;
}

// Generate event turnout plan based on user input
function generateTurnoutPlan() {
  const turnoutGoal = document.getElementById("turnoutGoal").value;
  const eventDate = document.getElementById("eventDate").value;

  if (!turnoutGoal || !eventDate) {
    alert("Please enter all fields.");
    return;
  }

  const neededRSVPs = turnoutGoal * 2; // You need double the turnout goal in RSVPs
  const adjustedGoal = neededRSVPs / (100 - flakeFactor);

  let resultText = `
    <strong>Event Turnout Plan:</strong><br>
    - You need to turnout ${turnoutGoal} people for your event on ${eventDate}.<br>
    - You need approximately ${Math.round(neededRSVPs)} RSVPs to reach that goal.<br>
    - To account for the 50% flake factor, you will need to contact approximately ${Math.round(adjustedGoal)} people.<br>
    <strong>Suggested Breakdown:</strong><br>
  `;

  // Break down across all contact methods
  Object.keys(contactRates).forEach(method => {
    const rate = contactRates[method];
    const peopleToContact = Math.ceil(adjustedGoal / (rate / 100));
    resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${peopleToContact} people<br>`;
  });

  document.getElementById("turnoutResult").innerHTML = resultText;
}
