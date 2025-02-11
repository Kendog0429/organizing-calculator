// Success rates for each method
const contactRates = {
  phone: 8,  // Phonebanking success rate (percentage)
  canvassing: 15,  // Canvassing success rate
  tabling: 25,  // Tabling success rate
  streetCanvassing: 10  // Street Canvassing success rate
};

// Handle the change of goal type (contact people or event turnout)
function handleGoalTypeChange() {
  const goalType = document.getElementById("goalType").value;
  
  if (goalType === "contactPeople") {
    document.getElementById("contactPeopleSection").style.display = "block";
    document.getElementById("eventTurnoutSection").style.display = "none";
  } else {
    document.getElementById("contactPeopleSection").style.display = "none";
    document.getElementById("eventTurnoutSection").style.display = "block";
  }
}

// Step 1 - Generate a contact plan without filtering
function generateContactPlanWithoutFilter() {
  const peopleToContact = document.getElementById("peopleToContactInput").value;

  if (!peopleToContact || peopleToContact <= 0) {
    alert("Please enter a valid number of people.");
    return;
  }

  const targetPeople = parseInt(peopleToContact);
  let totalCalculated = 0;
  let breakdown = {};

  // Calculate the number of people to contact based on the contact method success rate
  for (let method in contactRates) {
    let successRate = contactRates[method] / 100;
    let contactsNeeded = Math.ceil(targetPeople / successRate); // Account for success rate
    breakdown[method] = contactsNeeded;
    totalCalculated += contactsNeeded;
  }

  // Show the suggested breakdown
  let resultText = `<strong>Suggested Breakdown:</strong><br>`;
  for (let method in breakdown) {
    resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${breakdown[method]} people<br>`;
  }

  resultText += `<br>Total people to contact: ${totalCalculated}`;
  document.getElementById("result").innerHTML = resultText;
}

// Step 2 - Generate a contact plan with filtering by contact method
function generateContactPlanWithFilter() {
  const peopleToContact = document.getElementById("peopleToContactInput").value;
  const selectedMethod = document.getElementById("contactMethodFilter").value;

  if (!peopleToContact || peopleToContact <= 0 || !selectedMethod) {
    alert("Please enter a valid number of people and select a contact method.");
    return;
  }

  const targetPeople = parseInt(peopleToContact);
  const successRate = contactRates[selectedMethod] / 100;
  const contactsNeeded = Math.ceil(targetPeople / successRate); // Account for success rate

  let resultText = `<strong>Breakdown for ${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}:</strong><br>`;
  resultText += `You need to contact ${contactsNeeded} people to reach ${targetPeople} people.`;

  document.getElementById("result").innerHTML = resultText;
}

// Step 3 - Generate event turnout plan with flake factor
function generateEventTurnoutPlan() {
  const eventTurnoutGoalInput = document.getElementById("eventTurnoutGoalInput").value;
  const eventDate = document.getElementById("eventDateInput").value;

  if (!eventTurnoutGoalInput || eventTurnoutGoalInput <= 0 || !eventDate) {
    alert("Please enter a valid turnout goal and event date.");
    return;
  }

  const turnoutGoal = parseInt(eventTurnoutGoalInput);
  const adjustedGoal = turnoutGoal * 2; // Apply the flake factor (50% no-show)

  let totalCalculated = 0;
  let breakdown = {};

  // Calculate breakdown for each contact method
  for (let method in contactRates) {
    let successRate = contactRates[method] / 100;
    let contactsNeeded = Math.ceil(adjustedGoal / successRate); // Account for success rate
    breakdown[method] = contactsNeeded;
    totalCalculated += contactsNeeded;
  }

  // Show the event turnout plan
  let resultText = `
    <strong>Event Turnout Plan:</strong><br>
    - You need to turnout ${turnoutGoal} people for your event on ${eventDate}.<br>
    - Suggested breakdown:<br>
  `;

  for (let method in breakdown) {
    resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${breakdown[method]} people<br>`;
  }

  resultText += `<br>Total people to contact (adjusted for flake rate): ${totalCalculated}`;

  document.getElementById("result").innerHTML = resultText;
}
