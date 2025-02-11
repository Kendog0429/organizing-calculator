// Handle the first page - Enter total number of people or turnout goal
let totalPeople = 0; // This will store the number of people to contact
let eventTurnoutGoal = 0; // This will store the event turnout goal

const flakeFactor = 50; // Fixed flake factor (50%) — assumed

// Contact rate for each method
const contactRates = {
  phone: 8,           // Phonebanking (VPB)
  canvassing: 15,     // Canvassing
  tabling: 25,        // Tabling
  streetCanvassing: 10 // Street Canvassing
};

// Start Calculator - First Page
function startCalculator() {
  const peopleInput = document.getElementById("totalPeopleInput").value;

  if (!peopleInput || peopleInput <= 0) {
    alert("Please enter a valid number of people to contact.");
    return;
  }

  totalPeople = parseInt(peopleInput);
  document.getElementById("firstPage").style.display = "none";
  document.getElementById("secondPage").style.display = "block";
}

// Handle the second page - Generate the plan (outreach or event turnout)
function generatePlan() {
  const contactMethod = document.getElementById("contactMethod").value;
  const goalType = document.querySelector('input[name="goalType"]:checked').value; // Contact or Turnout
  let contactRate = contactRates[contactMethod];

  let resultText = '';
  let peopleToContact = 0;
  let peopleToAsk = 0;

  if (goalType === "contact") {
    // Outreach Plan
    const adjustedGoal = totalPeople / (contactRate / 100); // Adjust goal by contact rate
    peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);  // Apply 50% flake factor
    peopleToContact = Math.round(peopleToAsk);
    resultText = `
      <strong>Outreach Plan:</strong><br>
      - You need to contact approximately ${peopleToContact} people.<br>
      - Considering a ${flakeFactor}% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>
    `;
    resultText += generateMethodPlan(contactMethod, peopleToAsk);
  } else if (goalType === "turnout") {
    // Event Turnout Plan
    const turnoutGoal = parseInt(document.getElementById("turnoutGoal").value);
    const eventDate = document.getElementById("eventDate").value;

    // Double the RSVP goal to account for flake factor (50% no-show rate)
    const rsvpGoal = turnoutGoal * 2;

    // Calculate people to contact for RSVPs
    peopleToAsk = rsvpGoal / (1 - flakeFactor / 100);  // Apply 50% flake factor
    peopleToContact = Math.round(peopleToAsk);
    
    resultText = `
      <strong>Event Turnout Plan:</strong><br>
      - Your event turnout goal: ${turnoutGoal} people.<br>
      - You need to collect ${rsvpGoal} RSVPs to meet your turnout goal.<br>
      - Considering a ${flakeFactor}% flake factor, you need to ask ${peopleToContact} people.<br>
      - Event Date: ${eventDate}<br>
    `;
    resultText += generateMethodPlan(contactMethod, peopleToAsk);
  }

  // Show the result
  document.getElementById("result").innerHTML = resultText;
}

// Generate plan based on contact method
function generateMethodPlan(contactMethod, peopleToAsk) {
  let plan = '';
  if (contactMethod === "phone") {
    const phonebanks = Math.ceil(peopleToAsk / 100); // 100 people per phonebank
    plan += `You will need about ${phonebanks} phonebank(s).`;
  } else if (contactMethod === "canvassing") {
    const shifts = Math.ceil(peopleToAsk / 20); // 20 doors per canvassing shift
    plan += `You will need about ${shifts} canvassing shift(s).`;
  } else if (contactMethod === "tabling") {
    const tables = Math.ceil(peopleToAsk / 50); // 50 people per table
    plan += `You will need about ${tables} tabling session(s).`;
  } else if (contactMethod === "streetCanvassing") {
    const streetShifts = Math.ceil(peopleToAsk / 30); // 30 people per street canvassing shift
    plan += `You will need about ${streetShifts} street canvassing shift(s).`;
  }
  return plan;
}
