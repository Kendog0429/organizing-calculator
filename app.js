// Contact Rates (Based on your initial input)
const contactRates = {
  phone: 0.2,       // 20% success rate for phone
  canvassing: 0.3,  // 30% success rate for canvassing
  tabling: 0.4,     // 40% success rate for tabling
  streetCanvassing: 0.25  // 25% success rate for street canvassing
};

let peopleToContact = 0;
let eventTurnoutGoal = 0;

// Toggle visibility of sections based on user selection
function toggleSections() {
  const choice = document.getElementById('contactChoice').value;
  if (choice === 'contactPeople') {
    document.getElementById('contactPeopleSection').style.display = 'block';
    document.getElementById('eventTurnoutSection').style.display = 'none';
  } else {
    document.getElementById('contactPeopleSection').style.display = 'none';
    document.getElementById('eventTurnoutSection').style.display = 'block';
  }
}

// Calculate the number of people to contact for a certain goal
function calculateContactPlan() {
  peopleToContact = document.getElementById('peopleToContact').value;

  if (peopleToContact) {
    let contactPlan = calculateSuggestedBreakdown(peopleToContact);
    document.getElementById('contactPlanResult').innerHTML = contactPlan;
  }
}

// Calculate the suggested breakdown of contact methods based on the number of people
function calculateSuggestedBreakdown(people) {
  let phoneContacts = Math.ceil(people / contactRates.phone);
  let canvassingContacts = Math.ceil(people / contactRates.canvassing);
  let tablingContacts = Math.ceil(people / contactRates.tabling);
  let streetCanvassingContacts = Math.ceil(people / contactRates.streetCanvassing);

  return `
    <h3>Suggested Breakdown:</h3>
    <ul>
      <li>Phone: ${phoneContacts} people (approx. ${Math.ceil(phoneContacts / 10)} hours)</li>
      <li>Canvassing: ${canvassingContacts} people (approx. ${Math.ceil(canvassingContacts / 10)} hours)</li>
      <li>Tabling: ${tablingContacts} people (approx. ${Math.ceil(tablingContacts / 10)} hours)</li>
      <li>Street Canvassing: ${streetCanvassingContacts} people (approx. ${Math.ceil(streetCanvassingContacts / 10)} hours)</li>
    </ul>
  `;
}

// Enable or disable the "Create Custom Plan" button
function toggleCustomPlanButton() {
  const isChecked = document.getElementById('buildOutreachPlan').checked;
  document.getElementById('createCustomPlanButton').disabled = !isChecked;
}

// Create a custom outreach plan based on selected methods
function createCustomOutreachPlan() {
  const isChecked = document.getElementById('buildOutreachPlan').checked;

  if (isChecked) {
    let customPlan = `
      <h3>Custom Outreach Plan:</h3>
      <label for="customContactMethods">Select contact methods:</label>
      <div>
        <input type="checkbox" id="phoneMethod" /> Phone
        <input type="checkbox" id="canvassingMethod" /> Canvassing
        <input type="checkbox" id="tablingMethod" /> Tabling
        <input type="checkbox" id="streetCanvassingMethod" /> Street Canvassing
      </div>
      <button onclick="calculateCustomPlan()">Create Custom Plan</button>
    `;
    document.getElementById('outreachPlanResult').innerHTML = customPlan;
  }
}

// Calculate the custom outreach plan based on selected methods
function calculateCustomPlan() {
  const selectedMethods = [];
  if (document.getElementById('phoneMethod').checked) selectedMethods.push('phone');
  if (document.getElementById('canvassingMethod').checked) selectedMethods.push('canvassing');
  if (document.getElementById('tablingMethod').checked) selectedMethods.push('tabling');
  if (document.getElementById('streetCanvassingMethod').checked) selectedMethods.push('streetCanvassing');

  let totalContacts = 0;
  let customBreakdown = '<h3>Your Custom Plan:</h3><ul>';

  selectedMethods.forEach(method => {
    let methodContacts = Math.ceil(peopleToContact / contactRates[method]);
    totalContacts += methodContacts;
    customBreakdown += `
      <li>${method.charAt(0).toUpperCase() + method.slice(1)}: ${methodContacts} people (approx. ${Math.ceil(methodContacts / 10)} hours)</li>
    `;
  });

  customBreakdown += `</ul><p>Total People to Contact: ${totalContacts} people</p>`;
  document.getElementById('outreachPlanResult').innerHTML = customBreakdown;
}

// Calculate Event Turnout based on RSVP goal
function calculateEventTurnout() {
  eventTurnoutGoal = document.getElementById('eventTurnoutGoal').value;

  if (eventTurnoutGoal) {
    let RSVPs = eventTurnoutGoal * 2; // Assuming 50% flake rate
    let contactsNeeded = RSVPs;
    let breakdown = `
      <h3>Event Turnout Plan:</h3>
      <p>You need to turnout ${eventTurnoutGoal} people for your event.</p>
      <p>You need approximately ${RSVPs} RSVPs to reach that goal.</p>
      <p>To account for the Organizer Math (50% flake rate), you will need to contact approximately ${contactsNeeded} people.</p>
      <h3>Suggested Breakdown:</h3>
      <ul>
        <li>Phone: ${Math.ceil(contactsNeeded / contactRates.phone)} people</li>
        <li>Canvassing: ${Math.ceil(contactsNeeded / contactRates.canvassing)} people</li>
        <li>Tabling: ${Math.ceil(contactsNeeded / contactRates.tabling)} people</li>
        <li>Street Canvassing: ${Math.ceil(contactsNeeded / contactRates.streetCanvassing)} people</li>
      </ul>
    `;
    document.getElementById('eventTurnoutResult').innerHTML = breakdown;
  }
}
