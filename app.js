// Page 1: Save contact goal in localStorage
document.getElementById('nextButton').addEventListener('click', function() {
    const contactGoal = document.getElementById('contactGoal').value;
    if (contactGoal) {
        localStorage.setItem('contactGoal', contactGoal);
        window.location.href = 'page2.html';  // Redirect to page 2
    } else {
        alert('Please enter a contact goal!');
    }
});

// Page 2: Save contact method and rate, redirect to the next page
document.getElementById('doneButton').addEventListener('click', function() {
    const contactMethod = document.getElementById('contactMethod').value;
    const contactRate = document.getElementById('contactRate').value;
    
    if (contactMethod && contactRate) {
        localStorage.setItem('contactMethod', contactMethod);
        localStorage.setItem('contactRate', contactRate);
        const outreachPlanChecked = document.getElementById('outreachPlan').checked;
        localStorage.setItem('outreachPlanChecked', outreachPlanChecked);
        window.location.href = 'page3.html';  // Redirect to page 3
    } else {
        alert('Please select a contact method and rate!');
    }
});

// Page 3: Generate the outreach plan based on the stored data
document.addEventListener('DOMContentLoaded', function() {
    const contactGoal = localStorage.getItem('contactGoal');
    const contactMethod = localStorage.getItem('contactMethod');
    const contactRate = localStorage.getItem('contactRate');
    const outreachPlanChecked = localStorage.getItem('outreachPlanChecked') === 'true';

    if (contactGoal && contactMethod && contactRate) {
        let resultText = `You need to contact ${contactGoal} people using ${contactMethod} with a ${contactRate}% contact rate.<br>`;

        if (outreachPlanChecked) {
            // Calculate the outreach plan (simplified example)
            const adjustedGoal = contactGoal / (contactRate / 100);
            const peopleToAsk = adjustedGoal / (1 - 0.5);  // Assuming 50% flake factor

            resultText += `You will need to reach out to approximately ${Math.round(peopleToAsk)} people in total.<br>`;
        } else {
            resultText += 'No outreach plan was created.<br>';
        }

        document.getElementById('outreachPlanResult').innerHTML = resultText;
    } else {
        document.getElementById('outreachPlanResult').innerHTML = 'Error: Missing data.';
    }
});
