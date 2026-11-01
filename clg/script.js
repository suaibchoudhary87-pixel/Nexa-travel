
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// Set current year in footer
document.getElementById("year").textContent =
    new Date().getFullYear();

const searchForm = document.getElementById("searchForm");
const destinationInput = document.getElementById("destinationInput");
const budgetInput = document.getElementById("budgetInput");
const destinationCards = document.querySelectorAll(".destination-card");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchText = destinationInput.value.trim().toLowerCase();
    const budget = Number(budgetInput.value || 0);

    let matches = 0;

    destinationCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const price = Number(card.dataset.price || 0);

        const matchesText =
            searchText === "" || title.includes(searchText);

        const matchesBudget = !budget || price <= budget;

        if (matchesText && matchesBudget) {
            card.style.display = "flex";
            matches++;
        } else {
            card.style.display = "none";
        }
    });

    if (!matches) {
        alert("No trips found with that search. Try increasing your budget or changing destination.");
    }
});

const bookingModal = document.getElementById("bookingModal");
const modalClose = document.getElementById("modalClose");

const modalDestinationText =
    document.getElementById("modalDestinationText");

const modalGoToContact =
    document.getElementById("modalGoToContact");

document.querySelectorAll(".book-btn").forEach((btn) => {

    btn.addEventListener("click", (e) => {

        const card = e.target.closest(".card");
        if (!card) return;

        const destinationTitle =
            card.querySelector("h3")
                ? card.querySelector("h3").textContent
                : "your selected package";

        modalDestinationText.textContent =
            `You're booking: ${destinationTitle}. Continue to the booking form to share your details.`;

        bookingModal.classList.add("show");

    });

});

modalClose.addEventListener("click", () => {
    bookingModal.classList.remove("show");
});

bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove("show");
    }
});

modalGoToContact.addEventListener("click", () => {

    bookingModal.classList.remove("show");

    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });

});

const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
        document.getElementById("nameInput").value.trim();

    const email =
        document.getElementById("emailInput").value.trim();

    const destination =
        document.getElementById("destinationSelect").value;

    if (!name || !email) {

        formMessage.textContent =
            "Please fill in your name and email.";

        formMessage.className = "form-message error";

        return;
    }

    // Very basic email check

    if (!email.includes("@") || !email.includes(".")) {

        formMessage.textContent =
            "Please enter a valid email address.";

        formMessage.className = "form-message error";

        return;
    }

    if (!destination) {

        formMessage.textContent =
            "Please select a preferred destination.";

        formMessage.className = "form-message error";

        return;
    }

    // Send validated booking details to email.js

    formMessage.textContent = "Sending your booking request...";
    formMessage.className = "form-message";

    document.dispatchEvent(new CustomEvent("booking:validated", {
        detail: {
            name: name,
            email: email,
            phone: document.getElementById("phoneInput").value,
            destination: destination,
            people: document.getElementById("peopleInput").value,
            message: document.getElementById("messageInput").value
        }
    }));

});

// Reset search when Home is clicked

document.querySelector('a[href="#home"]').addEventListener("click", () => {

    // Clear search inputs
    destinationInput.value = "";
    budgetInput.value = "";

    // Show all destination cards
    destinationCards.forEach((card) => {
        card.style.display = "flex";
    });

});