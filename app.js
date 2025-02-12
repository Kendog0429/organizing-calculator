// Function to show the contact people page
function showContactPeople() {
  console.log("Showing Contact People page...");
  document.getElementById("step1").style.display = "none";
  document.getElementById("contactPeople").style.display = "block";
}

// Function to show the event turnout page
function showEventTurnout() {
  console.log("Showing Event Turnout page...");
  document.getElementById("step1").style.display = "none";
  document.getElementById("eventTurnout").style.display = "block";
}

// Function to show the custom outreach plan page
function showCustomOutreach() {
  console.log("Showing Custom Outreach page...");
  document.getElementById("eventTurnout").style.display = "none";
  document.getElementById("customOutreach").style.display = "block";
}

// Calculate the contact plan for a certain number of people
function calculateContactPlan() {
  const peopleToContact = parseInt(document.getElementById("peopleToContact").value);
  const contactMethod = document.getElementById("contactMethod").value;

  if (isNaN(peopleToContact) || peopleToContact <= 0) {
      alert("Please enter a valid number of people.");
      return;
  }

  console.log(`Calculating Contact Plan for ${peopleToContact} people using ${contactMethod}...`);

  // Default contact rates (adjust as needed)
  const contactRates = {
      phone: 0.2,      // 20% success rate for phone banking
      canvassing: 0.4, // 40% success rate for canvassing
      tabling: 0.3,    // 30% success rate for tabling
      streetCanvassing: 0.5 // 50% success rate for street canvassing
  };

  const contactRate = contactRates[contactMethod];

  if (!contactRate) {
      alert("Please select a valid contact method.");
      return;
  }

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
      - You need to turnout ${eventGoal} people
