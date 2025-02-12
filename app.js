const contactRates = {
  phone: 0.2,
  canvassing: 0.3,
  tabling: 0.4,
  streetCanvassing: 0.25
};

let peopleToContact = 0;
let eventTurnoutGoal = 0;

function calculateContactPlan() {
  peopleToContact = document.getElementById('peopleToContact').value;

  if (peopleToContact) {
    let contactPlan = calculateSuggestedBreakdown(peopleToContact);
    document.getElementById('contactPlanResult').innerHTML = contactPlan;
  }
}

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

function calculateEventTurnout() {
  eventTurnoutGoal = document.getElementById('eventTurnoutGoal').value;

  if (eventTurnoutGoal) {
    let RSVPs = eventTurnoutGoal * 2;
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
