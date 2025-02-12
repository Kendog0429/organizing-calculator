// Function to show the event turnout page
function showEventTurnout() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("eventTurnout").style.display = "block";
}

// Function to show the contact people page
function showContactPeople() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("contactPeople").style.display = "block";
}

// Calculate the event turnout
function calculateEventTurnout() {
  const eventGoal = parseInt(document.getElementById("eventGoal").value);
  const eventDate = document.getElementById("eventDate").value;

  if (isNaN(eventGoal) || eventGoal <= 0) {
      alert("Please enter a valid event turnout goal.");
      return;
  }

  // RSVP calculation (need to collect double the RSVPs to account for the flake rate)
  const rsvpsNeeded = eventGoal * 2;

  // Suggested breakdown based on default methods
  const contactMethods = ["phone", "canvassing", "tabling", "streetCanvassing"];
  let resultText = `
      <strong>Event Turnout Plan:</strong><br>
      - You need to turnout ${eventGoal} people for your event on ${eventDate}.<br>
      - You need approximately ${rsvpsNeeded} RSVPs to reach that goal.<br>
      - To account for the Organizer Math (50% flake rate), you will need approximately ${rsvpsNeeded} people.<br>
      <strong>Suggested Breakdown:</strong><br>
  `;

  // Default breakdown
  contactMethods.forEach(method => {
      resultText += `- ${capitalizeFirstLetter(method)}: ${Math.ceil(rsvpsNeeded / 4)} people (approx. 1 hour)<br>`;
  });

  document.getElementById("eventTurnoutResult").innerHTML = resultText;
}

// Calculate the contact plan for a certain number of people
function calculateContactPlan() {
  const peopleToContact = parseInt(document.getElementById("peopleToContact").value);
  const contactMethods = Array.from(document.getElementById("contactMethod").selectedOptions).map(option => option.value);

  if (isNaN(peopleToContact) || peopleToContact <= 0) {
      alert("Please enter a valid number of people to contact.");
      return;
  }

  const contactRates = {
      phone: 0.2,           // Contact rate: 20% for phone
      canvassing: 0.4,      // Contact rate: 40% for canvassing
      tabling: 0.3,         // Contact rate: 30% for tabling
      streetCanvassing: 0.5 // Contact rate: 50% for street canvassing
  };

  let resultText = `<strong>Contact Plan:</strong><br>`;
  let totalPeopleToContact = 0;

  contactMethods.forEach(method => {
      const contactRate = contactRates[method];
      const peopleToContactWithRate = Math.ceil(peopleToContact / contactRate);
      resultText += `- ${capitalizeFirstLetter(method)}: You will need to contact approximately ${peopleToContactWithRate} people using this method.<br>`;
      totalPeopleToContact += peopleToContactWithRate;
  });

  document.getElementById("contactPlanResult").innerHTML = resultText;
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
