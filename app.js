let totalPeople = 0; // This will store the number of people to contact
const flakeFactor = 50; // Fixed flake factor (50%) — assumed

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

// Toggle the display of outreach plan fields
function toggleOutreachPlanFields() {
  const isChecked = document.getElementById("generatePlanCheckbox").checked;
  document.getElementById("outreachPlanFields").style.display = isChecked ? "block" : "none";
}

function generatePlan() {
  const contactMethod = document.getElementById("contactMethod").value;
  const isOutreachPlanChecked = document.getElementById("generatePlanCheckbox").checked;

  if (isOutreachPlanChecked) {
    // Generating detailed outreach plan using turnout template
    generateOutreachPlan();
  } else {
    // Generate basic outreach calculation
    generateContactCalculation(contactMethod);
  }
}

// Basic contact calculation based on contact method
function generateContactCalculation(contactMethod) {
  let contactRate = 0;
  if (contactMethod === "phone") {
    contactRate = 8;  // Phonebanking (VPB)
  } else if (contactMethod === "canvassing") {
    contactRate = 15;  // Canvassing
  } else if (contactMethod === "tabling") {
    contactRate = 25;  // Tabling
  } else if (contactMethod === "streetCanvassing") {
    contactRate = 10;  // Street Canvassing
  }

  // Calculate the number of people to contact based on the contact rate and the flake factor
  const adjustedGoal = totalPeople / (contactRate / 100);
  const peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);  // 50% flake factor

  let resultText = `
    <strong>Basic Outreach Calculation:</strong><br>
    - You need to contact approximately ${Math.round(adjustedGoal)} people.<br>
    - Considering a ${flakeFactor}% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>
  `;

  // Calculate outreach actions based on the selected contact method
  if (contactMethod === "phone") {
    const phonebanks = Math.ceil(peopleToAsk / 100); // 100 people per phonebank
    resultText += `You will need about ${phonebanks} phonebank(s).`;
  } else if (contactMethod === "canvassing") {
    const shifts = Math.ceil(peopleToAsk / 20); // 20 doors per canvassing shift
    resultText += `You will need about ${shifts} canvassing shift(s).`;
  } else if (contactMethod === "tabling") {
    const tables = Math.ceil(peopleToAsk / 50); // 50 people per table
    resultText += `You will need about ${tables} tabling session(s).`;
  } else if (contactMethod === "streetCanvassing") {
    const streetShifts = Math.ceil(peopleToAsk / 30); // 30 people per street canvassing shift
    resultText += `You will need about ${streetShifts} street canvassing shift(s).`;
  }

  document.getElementById("result").innerHTML = resultText;
}

// Generate detailed outreach plan based on turnout goal and RSVP targets
function generateOutreachPlan() {
  const eventTurnoutGoal = parseInt(document.getElementById("eventTurnoutGoal").value);
  const eventDate = document.getElementById("eventDate").value;

  const topLeaders = document.getElementById("topLeaders").value.split(",");  // Example: "John, Jane"
  const leadersCount = topLeaders.length;
  
  const additionalParticipantsNeeded = eventTurnoutGoal - leadersCount;
  const rsvpGoal = eventTurnoutGoal * 2;  // Assume 2x RSVPs needed
  const weeksUntilEvent = 2;  // For now, using a fixed number of weeks
  const rsvpsPerWeek = Math.ceil(rsvpGoal / weeksUntilEvent);
  
  // Calculate volunteer shifts
  const volunteerShifts = Math.ceil(rsvpGoal / 10); // 10 volunteers per shift
  const volunteerRecruitmentCalls = volunteerShifts * 10; // 10 calls per shift

  let resultText = `
    <strong>Outreach Plan:</strong><br>
    - Event Date: ${eventDate}<br>
    - Event Turnout Goal: ${eventTurnoutGoal} people<br>
    - Top Leaders Attending: ${leadersCount} (${topLeaders.join(", ")})<br>
    - Additional Participants Needed: ${additionalParticipantsNeeded}<br>
    - RSVPs Required: ${rsvpGoal}<br>
    - You need to collect ${rsvpsPerWeek} RSVPs per week for the next 2 weeks.<br>
    - Volunteer Shifts Needed: ${volunteerShifts}<br>
    - Volunteer Recruitment Calls Needed: ${volunteerRecruitmentCalls}<br>
  `;

  document.getElementById("result").innerHTML = resultText;
}
