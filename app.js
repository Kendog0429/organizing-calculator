// Function to show the contact people page
function showContactPeople() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("contactPeople").style.display = "block";
}

// Function to show the event turnout page
function showEventTurnout() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("eventTurnout").style.display = "block";
}

// Function to show the custom outreach plan page
function showCustomOutreach() {
  document.getElementById("eventTurnout").style.display = "none";
  document.getElementById("customOutreach").style.display = "block";
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
      - To account for the Organizer Math (50% flake rate), you will need to contact approximately ${rsvpsNeeded} people.<br>
      <strong>Suggested Breakdown:</strong><br>
  `;

  // Default breakdown
  contactMethods.forEach(method => {
      resultText += `- ${capitalizeFirstLetter(method)}: ${Math.ceil(rsvpsNeeded / 4)} people (approx. 1 hour)<br>`;
  });

  document.getElementById("eventTurnoutResult").innerHTML = resultText;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate custom outreach plan based on selected contact methods
function generateCustomPlan() {
  const selectedMethods = [];
  const methods = ["Phone", "Canvassing", "Tabling", "StreetCanvassing"];
  methods.forEach(method => {
      if (document.getElementById(`method${method}`).checked) {
          selectedMethods.push(method);
      }
  });

  let resultText = "<strong>Custom Outreach Plan:</strong><br>";
  if (selectedMethods.length > 0) {
      selectedMethods.forEach(method => {
          resultText += `- ${method}: Apply specific contact rates here...<br>`;
      });
  } else {
      resultText += "No contact methods selected!";
  }

  document.getElementById("customPlanResult").innerHTML = resultText;
}
