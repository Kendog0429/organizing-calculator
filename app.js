// Event listener to trigger step1 options
function showContactPeople() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("contactPeople").style.display = "block";
}

function showEventTurnout() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("eventTurnout").style.display = "block";
}

// Calculate the contact plan for a certain number of people
function calculateContactPlan() {
  const peopleToContact = parseInt(document.getElementById("peopleToContact").value);
  const contactMethod = document.getElementById("contactMethod").value;

  // Default contact rates (adjust as needed)
  const contactRates = {
      phone: 0.2,      // 20% success rate for phone banking
      canvassing: 0.4, // 40% success rate for canvassing
      tabling: 0.3,    // 30% success rate for tabling
      streetCanvassing: 0.5 // 50% success rate for street canvassing
  };

  const contactRate = contactRates[contactMethod];

  // Calculate the number of people to contact based on the success rate
  const peopleToContactWithRate = Math.ceil(peopleToContact / contactRate);
  const hoursNeeded = Math.ceil(peopleToContactWithRate / 20); // 20 people per hour (as an example rate)

  let resultText = `
      <strong>Suggested Breakdown:</strong><br>
      - ${capitalizeFirstLetter(contactMethod)}: ${peopleToContactWithRate} people (approx. ${hoursNeeded} hours of work)<br>
  `;

  document.getElementById("contactPlanResult").innerHTML = resultText;
}

// Calculate the event turnout plan with "Organizer Math"
function calculateEventTurnout() {
  const eventGoal = parseInt(document.getElementById("eventGoal").value);
  const eventDate = document.getElementById("eventDate").value;

  // RSVP calculation (need to collect double the RSVPs to account for the flake rate)
  const rsvpsNeeded = eventGoal * 2;

  // Suggested breakdown based on default methods
  const contactMethods = ["phone", "canvassing", "tabling", "streetCanvassing"];
  let resultText = `
      <strong>Event Turnout Plan:</strong><br>
      - You need to turnout ${eventGoal} people for your event on ${eventDate}.<br>
      - You need approximately ${rsvpsNeeded} RSVPs to reach that goal.<br>
      - To account for the Organizer Math (50% flake rate), you will need to contact approximately ${rsvpsNeeded * 2} people.<br>
      <strong>Suggested Breakdown:</strong><br>
  `;

  // Distribute the total number of people evenly among the methods
  for (let method of contactMethods) {
      const methodPeople = Math.ceil(rsvpsNeeded / 4); // Evenly split across methods
      const methodHours = Math.ceil(methodPeople / 20); // Assume 20 people per hour
      resultText += `${capitalizeFirstLetter(method)}: ${methodPeople} people (approx. ${methodHours} hours)<br>`;
  }

  document.getElementById("eventTurnoutResult").innerHTML = resultText;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
