function calculateOutreach() {
    const contactGoal = parseInt(localStorage.getItem('contactGoal'));
    const contactMethod = localStorage.getItem('contactMethod');
    const contactRate = parseInt(localStorage.getItem('contactRate'));
    const flakeFactor = 50; // Assuming default flake factor as 50%
  
    if (!contactGoal || !contactMethod || !contactRate) {
      alert("Please complete all fields.");
      return;
    }
  
    // Calculate adjusted goal and people to ask
    const adjustedGoal = contactGoal / (contactRate / 100);
    const peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);
  
    let resultText = `<strong>For ${contactGoal} people:</strong><br>
      - You need to contact approximately ${Math.round(adjustedGoal)} people.<br>
      - To account for a 50% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>`;
  
    if (contactMethod === "phone") {
      const phonebanks = Math.ceil(peopleToAsk / 100);
      resultText += `You will need about ${phonebanks} phonebank(s).`;
    } else if (contactMethod === "canvassing") {
      const shifts = Math.ceil(peopleToAsk / 20);
      resultText += `You will need about ${shifts} canvassing shift(s).`;
    } else if (contactMethod === "tabling") {
      const tables = Math.ceil(peopleToAsk / 50);
      resultText += `You will need about ${tables} tabling session(s).`;
    } else if (contactMethod === "streetCanvassing") {
      const streetShifts = Math.ceil(peopleToAsk / 30);
      resultText += `You will need about ${streetShifts} street canvassing shift(s).`;
    }
  
    document.getElementById("result").innerHTML = resultText;
  
    // Handle outreach plan if checked
    if (localStorage.getItem('outreachPlan') === "true") {
      // Here you can add further breakdown logic for multiple contact methods, if required
    }
  }
  