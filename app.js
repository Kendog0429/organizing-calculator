document.addEventListener("DOMContentLoaded", () => {
    const nextStep1 = document.getElementById("next-step-1");
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");

    nextStep1.addEventListener("click", () => {
        const peopleNeeded = document.getElementById("peopleNeeded").value;
        if (peopleNeeded && peopleNeeded > 0) {
            step1.style.display = "none";
            step2.style.display = "block";
        } else {
            alert("Please enter a valid number of people.");
        }
    });

    const generatePlanButton = document.getElementById("generatePlan");
    const resultDiv = document.getElementById("result");
    const contactPlan = document.getElementById("contactPlan");
    const doorPlan = document.getElementById("doorPlan");

    generatePlanButton.addEventListener("click", () => {
        const peopleNeeded = parseInt(document.getElementById("peopleNeeded").value);
        const contactRate = parseFloat(document.getElementById("contactRate").value);
        const flakeFactor = parseFloat(document.getElementById("flakeFactor").value);

        if (peopleNeeded && contactRate && flakeFactor) {
            const peopleToContact = (peopleNeeded / contactRate) * (1 / (1 - flakeFactor));
            const doorsToKnock = Math.round(peopleToContact / 5);

            contactPlan.textContent = `You need to contact approximately ${Math.round(peopleToContact)} people.`;
            doorPlan.textContent = `You need to knock on about ${doorsToKnock} doors.`;

            resultDiv.style.display = "block";
        } else {
            alert("Please fill in all fields with valid data.");
        }
    });
});
