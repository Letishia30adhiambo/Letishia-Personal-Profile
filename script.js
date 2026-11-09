
const photoUpload = document.getElementById("photoUpload");
const homePhoto = document.getElementById("homePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

photoUpload.addEventListener("change", function () {

    const file = this.files[0];

    if (file && file.type.startsWith("image/")) {

        const reader = new FileReader();

        reader.onload = function (event) {

            homePhoto.src = event.target.result;
            homePhoto.style.display = "block";

            photoPlaceholder.style.display = "none";

            // Keep the selected photo available on this browser
            localStorage.setItem("profilePhoto", event.target.result);

        };

        reader.readAsDataURL(file);

    }

});

// Load previously selected photo
const savedPhoto = localStorage.getItem("profilePhoto");

if (savedPhoto) {
    homePhoto.src = savedPhoto;
    homePhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
}

// Dark and light theme
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");

    themeToggle.textContent =
        document.body.classList.contains("light-theme")
        ? "🌙"
        : "☀️";

});
```javascript
// Initialize EmailJS
emailjs.init({
    publicKey: "wRZ0k6Cv8kpZO71zk"
});

// Select form elements
const contactForm = document.getElementById("contact-form");

const sendButton = document.getElementById("send-btn");

const statusMessage = document.getElementById("status-message");

// Listen for form submission
contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Show sending message
    sendButton.disabled = true;

    sendButton.textContent = "Sending...";

    statusMessage.textContent = "";

    // Send form using EmailJS
    emailjs.sendForm(
        "service_42z9vqj",
        "template_lkyw6b7",
        contactForm
    )

    .then(function(response) {

        console.log("SUCCESS!", response.status);

        statusMessage.textContent =
            "Your message has been sent successfully! Thank you 💌";

        statusMessage.style.color = "#9cff75";

        // Clear the form
        contactForm.reset();

    })

    .catch(function(error) {

        console.error("EmailJS Error:", error);

        statusMessage.textContent =
            "Sorry! Message failed. Please check your connection and try again.";

        statusMessage.style.color = "#ff7777";

    })

    .finally(function() {

        sendButton.disabled = false;

        sendButton.textContent = "Send Message ✉";

    });

});
```