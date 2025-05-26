document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    console.log('Form Data:', Object.fromEntries(formData.entries()));
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfxWxeGvDhszxFKoqQZEc17MTHQ5hPuQXdkE7t8RRJ_495n2Q/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        // After submission, redirect to thanks.html on the same tab
        window.location.href = 'thanks.html';
    }).catch((error) => {
        alert('Submission failed. Please try again.');
        console.error(error);
    });
});
