
(function () {
    emailjs.init({
        publicKey: "XbshqKervgDNqUiJG"
    });
})();

document.addEventListener("booking:validated", function (event) {

    const templateParams = event.detail;

    emailjs.send(
        "service_udc665k",
        "template_wjdoedi",
        templateParams
    )
    .then(function (response) {

        console.log("Email sent successfully:", response);

        const formMessage = document.getElementById("formMessage");
        const bookingForm = document.getElementById("bookingForm");

        formMessage.textContent =
            "Thank you! Your booking request has been received. We'll contact you soon.";

        formMessage.className = "form-message success";

        bookingForm.reset();

    })
    .catch(function (error) {

        console.error("EmailJS Error:", error);

        const formMessage = document.getElementById("formMessage");

        formMessage.textContent =
            "Email could not be sent. Please try again.";

        formMessage.className = "form-message error";

    });

});