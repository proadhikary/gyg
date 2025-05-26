document.getElementById('mentor-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const checkboxes1 = document.getElementById("admission-process").querySelectorAll(".checkbox-input");
    const checkboxes2 = document.getElementById("topics-can-guide").querySelectorAll(".checkbox-input");
    const checkboxes3 = document.getElementById("mentorship-sessions").querySelectorAll(".checkbox-input");
    const hiddenInput1 = document.getElementById("admissionCombined");
    const hiddenInput2 = document.getElementById("guideCombined");
    const hiddenInput3 = document.getElementById("sessionsCombined");

    const selected1 = Array.from(checkboxes1)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    hiddenInput1.value = selected1.join(", ");

    const selected2 = Array.from(checkboxes2)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    hiddenInput2.value = selected2.join(", ");

    hiddenInput3.value = checkboxes3[0]

    const formData = new FormData(form);

    console.log('Form Data:', Object.fromEntries(formData.entries()));
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfKwmjGkEq__L1giuBtepLc7DKBFjxH0Emlhk0MpS6XZndiyg/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        window.location.href = 'thanks.html';
    }).catch((error) => {
        alert('Submission failed. Please try again.');
        console.error(error);
    });
});