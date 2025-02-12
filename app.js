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
      - To account for the Organizer Math (50% flake rate), you will need to contact approximately ${rsvpsNeeded} people.<br>
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
  const contactMethod = document.getElementById("contactMethod").value;

  if (isNaN(peopleToContact) || peopleToContact <= 0) {
      alert("Please enter a valid number of people.");
      return;
  }

  // Default contact rates
  const contactRates = {
      phone: 0.2,
      canvassing: 0.4,
      tabling: 0.3,
      streetCanvassing: 0.5
  };

  const contactRate = contactRates[contactMethod];

  if (!contactRate) {
      alert("Please select a valid contact method.");
      return;
  }

  const peopleToContactWithRate = Math.ceil(peopleToContact / contactRate);
  const hoursNeeded = Math.ceil(peopleToContactWithRate / 20); // 20 people per hour (example rate)

  let resultText = `
      <strong>Suggested Breakdown:</strong><br>
      - ${capitalizeFirstLetter(contactMethod)}: ${peopleToContactWithRate} people (approx. ${hoursNeeded} hours of work)<br>
  `;

  document.getElementById("contactPlanResult").innerHTML = resultText;
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate a custom plan based on selected methods
function generateCustomPlan() {
  const selectedMethods = [];
  if (document.getElementById("methodPhone").checked) selectedMethods.push("Phone");
  if (document.getElementById("methodCanvassing").checked) selectedMethods.push("Canvassing");
  if (document.getElementById("methodTabling").checked) selectedMethods.push("Tabling");
  if (document.getElementById("methodStreet").checked) selectedMethods.push("Street Canvassing");

  if (selectedMethods.length === 0) {
      alert("Please select at least one contact method.");
      return;
  }

  let resultText = `<strong>Custom Outreach Plan:</strong><br>`;
  selectedMethods.forEach(method => {
      resultText += `- ${method}: You can use this method to reach out to people.<br>`;
  });

  document.getElementById("customPlanResult").innerHTML = resultText;
}
