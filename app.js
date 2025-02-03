function calculateOutreach() {
    // Get the user inputs
    const contactGoal = parseInt(document.getElementById("contactGoal").value);
    const contactMethod = document.getElementById("contactMethod").value;
    const contactRateInput = document.getElementById("contactRate");
    const flakeFactor = parseInt(document.getElementById("flakeFactor").value);

    // Validate if contactGoal or flakeFactor is not empty
    if (!contactGoal || !flakeFactor) {
        document.getElementById("result").innerHTML = "<p>Please provide both the number of people to contact and flake factor.</p>";
        return;
    }

    // Default contact rate
    let contactRate = parseInt(contactRateInput.value);

    // Set the contact rate automatically based on selected method
    if (contactMethod === "phone") {
        contactRate = 8;  // Phonebanking (VPB)
        contactRateInput.value = contactRate;  // Update the field with the correct rate
    } else if (contactMethod === "canvassing") {
        contactRate = 15;  // Canvassing
        contactRateInput.value = contactRate;  // Update the field with the correct rate
    } else if (contactMethod === "tabling") {
        contactRate = 5;  // Tabling
        contactRateInput.value = contactRate;  // Update the field with the correct rate
    } else if (contactMethod === "streetCanvassing") {
        contactRate = 10;  // Street Canvassing
        contactRateInput.value = contactRate;  // Update the field with the correct rate
    }

    // Calculate how many people need to be contacted based on the contact rate
    const adjustedGoal = contactGoal / (contactRate / 100);

    // Calculate the number of people to ask considering the flake factor
    const peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);

    // Start building the result text
    let resultText = `<strong>For ${contactGoal} people:</strong><br>
    - You need to contact approximately ${Math.round(adjustedGoal)} people.<br>
    - To account for a ${flakeFactor}% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>`;

    // Calculate outreach actions (phonebanks, canvassing shifts, etc.)
    if (contactMethod === "phone") {
        const phonebanks = Math.ceil(peopleToAsk / 100); // Assume 100 people per phonebank
        resultText += `You will need about ${phonebanks} phonebank(s).`;
    } else if (contactMethod === "canvassing") {
        const shifts = Math.ceil(peopleToAsk / 20); // Assume 20 doors per canvassing shift
        resultText += `You will need about ${shifts} canvassing shift(s).`;
    } else if (contactMethod === "tabling") {
        const tables = Math.ceil(peopleToAsk / 50); // Assume 50 people per table
        resultText += `You will need about ${tables} tabling session(s).`;
    } else if (contactMethod === "streetCanvassing") {
        const streetShifts = Math.ceil(peopleToAsk / 30); // Assume 30 people per street canvassing shift
        resultText += `You will need about ${streetShifts} street canvassing shift(s).`;
    }

    // Display the results in the result div
    document.getElementById("result").innerHTML = resultText;
    document.getElementById("result").style.display = "block";  // Show the result section after calculation
}
