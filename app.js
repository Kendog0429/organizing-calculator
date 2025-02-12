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

  // Show the Next Step button
  document.getElementById("nextStepBtn").style.display = "block";
}

// Function to navigate to the next step for custom outreach
function showCustomOutreach() {
  document.getElementById("eventTurnout").style.display = "none";
  document.getElementById("customOutreach").style.display = "block";
}

// Function to generate a custom outreach plan based on selected methods
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

  const rsvpsNeeded = parseInt(document.getElementById("eventGoal").value) * 2;  // Get the needed RSVPs from the event turnout goal
  const contactRates = {
      phone: 0.2,
      canvassing: 0.4,
      tabling: 0.3,
      streetCanvassing: 0.5
  };

  let resultText = `<strong>Custom Outreach Plan:</strong><br>`;
  selectedMethods.forEach(method => {
      const contactRate = contactRates[method.toLowerCase()];
      const peopleToContactWithRate = Math.ceil(rsvpsNeeded / contactRate);
      resultText += `- ${method}: You need to contact ${peopleToContactWithRate} people to achieve your goal of ${rsvpsNeeded} RSVPs.<br>`;
  });

  document.getElementById("customPlanResult").innerHTML = resultText;
}

// Function to calculate the contact plan for a certain number of people
function calculateContactPlan() {
  const peopleToContact = parseInt(document.getElementById("peopleToContact").value);
  const contactMethods = Array.from(document.getElementById("contactMethod").selectedOptions).map(option => option.value);

  if (isNaN(peopleToContact) || peopleToContact <= 0) {
      alert("Please enter a valid number of people.");
      return;
  }

  const contactRates = {
      phone: 0.2,
      canvassing: 0.4,
      tabling: 0.3,
      streetCanvassing: 0.5
  };

  let resultText = `<strong>Contact Plan:</strong><br>`;
  let totalPeopleToContact = 0;
  contactMethods.forEach(method => {
      const contactRate = contactRates[method];
      const peopleToContactWithRate = Math.ceil(peopleToContact / contactRate);
      const hoursNeeded = Math.ceil(peopleToContactWithRate / 20);
      resultText += `- ${capitalizeFirstLetter(method)}: ${peopleToContactWithRate} people (approx. ${hoursNeeded} hours)<br>`;
      totalPeopleToContact += peopleToContactWithRate;
  });

  document.getElementById("contactPlanResult").innerHTML = resultText;
}

// Helper function to capitalize the first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
