// Event listener to trigger step1 options
function showContactPeople() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("contactPeople").style.display = "block";
}

function showEventTurnout() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("eventTurnout").style.display = "block";
}

// Calculate the contact plan for a certain number of people
function calculateContactPlan() {
  const peopleToContact = parseInt(document.getElementById("peopleToContact").value);
  const filterContactMethod = document.getElementById("filterContactMethod").checked;

  // Default rates (adjust as needed)
  const contactRates = {
      phone: 8,      // 8 people per hour of phonebanking
      canvassing: 15, // 15 people per hour of canvassing
      tabling: 25,   // 25 people per hour of tabling
      streetCanvassing: 10 // 10 people per hour of street canvassing
  };

  let totalPeople = peopleToContact;
  let contactBreakdown = {};

  if (filterContactMethod) {
      // If the user has selected to filter by contact method, use their selection.
      const selectedMethod = prompt("Enter the contact method (phone, canvassing, tabling, streetCanvassing): ").toLowerCase();
      if (contactRates[selectedMethod]) {
          contactBreakdown[selectedMethod] = totalPeople / contactRates[selectedMethod];
      } else {
          alert("Invalid contact method.");
          return;
      }
  } else {
      // If no filter, split the total people across all methods.
      for (let method in contactRates) {
          contactBreakdown[method] = totalPeople / 4; // Evenly distribute
      }
  }

  let resultText = `<strong>Suggested Breakdown:</strong><br>`;
  for (let method in contactBreakdown) {
      resultText += `${method.charAt(0).toUpperCase() + method.slice(1)}: ${Math.round(contactBreakdown[method])} people<br>`;
  }

  document.getElementById("contactPlanResult").innerHTML = resultText;
}

// Calculate the event turnout plan
function calculateEventTurnout() {
  const eventGoal = parseInt(document.getElementById("eventGoal").value);
  const eventDate = document.getElementById("eventDate").value;

  // RSVPs need to be double the event goal due to the flake factor
  const rsvpsNeeded = eventGoal * 2;
  let resultText = `
      <strong>Event Turnout Plan:</strong><br>
      - You need to turnout ${eventGoal} people for your event on ${eventDate}.<br>
      - You need approximately ${rsvpsNeeded} RSVPs to reach that goal.<br>
      - To account for the 50% flake factor, you will need to contact approximately ${Math.round(rsvpsNeeded * 2)} people.<br>
      <strong>Suggested Breakdown:</strong><br>
      - Phone: ${Math.round(rsvpsNeeded / 4)} people<br>
      - Canvassing: ${Math.round(rsvpsNeeded / 4)} people<br>
      - Tabling: ${Math.round(rsvpsNeeded / 4)} people<br>
      - Street Canvassing: ${Math.round(rsvpsNeeded / 4)} people<br>
  `;

  document.getElementById("eventTurnoutResult").innerHTML = resultText;
}
