const flakeFactor = 50; // 50% no-show rate

// Contact method success rates
const contactRates = {
  phone: 8, // Phonebanking: 8%
  canvassing: 15, // Canvassing: 15%
  tabling: 25, // Tabling: 25%
  streetCanvassing: 10 // Street Canvassing: 10%
};

// Function to move between steps
function nextStep(stepNumber) {
  const allSteps = document.querySelectorAll('.step');
  allSteps.forEach(step => step.style.display = 'none'); // Hide all steps
  document.getElementById(`step${stepNumber}`).style.display = 'block'; // Show the selected step
}

// Handle contact people process
function calculateContactPeople() {
  const numPeople = parseInt(document.getElementById("contactPeopleNumber").value);
  const filterByContactMethod = document.getElementById("filterContactMethod").checked;
  let contactMethod = document.getElementById("contactMethod").value;

  if (!numPeople || numPeople <= 0) {
    alert("Please enter a valid number of people to contact.");
    return;
  }

  let breakdown = {};
  let totalContacts = 0;

  // If filtering by contact method, only use the selected method
  if (filterByContactMethod) {
    const rate = contactRates[contactMethod];
    breakdown[contactMethod] = Math.ceil(numPeople / (rate / 100));
    totalContacts = breakdown[contactMethod];
  } else {
    // Breakdown across all methods
    for (const method in contactRates) {
      const rate = contactRates[method];
      breakdown[method] = Math.ceil(numPeople / (rate / 100));
      totalContacts += breakdown[method];
    }
  }

  const adjustedContacts = Math.ceil(totalContacts * (1 + flakeFactor / 100)); // Adjusted for flake factor

  // Display results
  let resultText = `
    <strong>Suggested Breakdown:</strong><br>
    Total people to contact: ${numPeople}<br>
    Total adjusted for flake rate: ${adjustedContacts}<br>
    <strong>Breakdown by Method:</strong><br>
  `;
  
  for (const method in breakdown) {
    resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${breakdown[method]} people<br>`;
  }

  document.getElementById("resultText").innerHTML = resultText;
  nextStep(4);
}

// Handle event turnout calculation
function calculateEventTurnout() {
  const turnoutGoal = parseInt(document.getElementById("turnoutGoal").value);
  const eventDate = document.getElementById("eventDate").value;
  const coreLeaders = parseInt(document.getElementById("coreLeaders").value);
  const coreLeaderNames = document.getElementById("coreLeaderNames").value;

  if (!turnoutGoal || turnoutGoal <= 0) {
    alert("Please enter a valid turnout goal.");
    return;
  }

  const rsvpsNeeded = turnoutGoal * 2; // Organizing Math (Need double the people for RSVPs)
  const adjustedRSVPs = Math.ceil(rsvpsNeeded * (1 + flakeFactor / 100)); // Adjusted for flake rate
  const weeksUntilEvent = parseInt(document.getElementById("weeksUntilEvent").value);

  const rsvpsPerWeek = Math.ceil(rsvpsNeeded / weeksUntilEvent); // RSVPs per week

  const volunteerShifts = Math.ceil(rsvpsNeeded / 10); // 10 people per volunteer shift
  const volunteerCalls = volunteerShifts * 10; // 10 volunteer calls per shift

  let resultText = `
    <strong>Event Turnout Plan for ${eventDate}:</strong><br>
    You need ${turnoutGoal} people to attend the event.<br>
    You need ${rsvpsNeeded} RSVPs (since half may not show up).<br>
    Total adjusted for flake rate: ${adjustedRSVPs} RSVPs.<br><br>
    
    <strong>Breakdown:</strong><br>
    - You need to contact ${rsvpsNeeded} people<br>
    - Number of weeks until event: ${weeksUntilEvent}<br>
    - RSVPs per week: ${rsvpsPerWeek}<br>
    - Number of volunteer shifts: ${volunteerShifts}<br>
    - Number of volunteer calls: ${volunteerCalls}<br>
  `;

  document.getElementById("resultText").innerHTML = resultText;
  nextStep(4);
}

function goBack() {
  nextStep(1);
}
