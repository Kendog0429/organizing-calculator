// Code for index.html (First Page)
document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('nextButton');

    nextButton.addEventListener('click', function() {
        const contactGoal = document.getElementById('contactGoal').value;
        
        if (contactGoal) {
            // Save data to localStorage for use on the second page
            localStorage.setItem('contactGoal', contactGoal);

            // Redirect to the second page
            window.location.href = 'contactMethod.html';  
        } else {
            alert('Please enter a contact goal!');
        }
    });
});

// Code for contactMethod.html (Second Page)
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve contact goal from localStorage
    const contactGoal = localStorage.getItem('contactGoal');
    if (!contactGoal) {
        alert('Please go back to the first page to enter the total number of people.');
        window.location.href = 'index.html';  // Redirect back if goal is not set
    }

    document.getElementById('contactGoal').innerHTML = contactGoal;

    const doneButton = document.getElementById('doneButton');
    doneButton.addEventListener('click', function() {
        const contactMethod = document.getElementById('contactMethod').value;
        const contactRate = parseInt(document.getElementById('contactRate').value);
        const flakeFactor = parseInt(document.getElementById('flakeFactor').value);
        const generatePlan = document.getElementById('generatePlan').checked;

        if (contactMethod && contactRate && flakeFactor) {
            // Calculate outreach
            const adjustedGoal = contactGoal / (contactRate / 100);
            const peopleToAsk = adjustedGoal / (1 - flakeFactor / 100);

            let resultText = `<strong>For ${contactGoal} people:</strong><br>
                              - You need to contact approximately ${Math.round(adjustedGoal)} people.<br>
                              - To account for a ${flakeFactor}% flake factor, you need to ask ${Math.round(peopleToAsk)} people.<br>`;

            // If generate plan is checked, show the outreach plan
            if (generatePlan) {
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
            }

            // Display result
            document.getElementById('result').innerHTML = resultText;

        } else {
            alert('Please fill in all fields!');
        }
    });
});
