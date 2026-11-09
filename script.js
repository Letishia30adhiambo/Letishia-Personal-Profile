
// ============================================
// LA. PERSONAL PROFILE
// Profile Photo + Theme Switcher + Gmail Form
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. PROFILE PHOTO UPLOAD
    // ========================================

    const photoUpload = document.getElementById("photoUpload");
    const homePhoto = document.getElementById("homePhoto");
    const photoPlaceholder = document.getElementById("photoPlaceholder");

    // Load previously saved profile photo
    const savedPhoto = localStorage.getItem("profilePhoto");

    if (savedPhoto && homePhoto && photoPlaceholder) {
        homePhoto.src = savedPhoto;
        homePhoto.style.display = "block";
        photoPlaceholder.style.display = "none";
    }

    // Allow user to upload a new photo
    if (photoUpload && homePhoto && photoPlaceholder) {

        photoUpload.addEventListener("change", function () {

            const file = this.files[0];

            if (file && file.type.startsWith("image/")) {

                const reader = new FileReader();

                reader.onload = function (event) {

                    homePhoto.src = event.target.result;
                    homePhoto.style.display = "block";

                    photoPlaceholder.style.display = "none";

                    // Save photo in browser storage
                    try {
                        localStorage.setItem(
                            "profilePhoto",
                            event.target.result
                        );
                    } catch (error) {
                        console.error("Could not save profile photo:", error);
                    }

                };

                reader.readAsDataURL(file);

            } else if (file) {

                alert("Please select a valid image file.");

            }

        });

    }


    // ========================================
    // 2. DARK AND LIGHT THEME SWITCHER
    // ========================================

    const themeToggle = document.getElementById("themeToggle");

    // Restore the previously selected theme
    const savedTheme = localStorage.getItem("profileTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    if (themeToggle) {

        themeToggle.textContent =
            document.body.classList.contains("light-theme")
                ? "🌙"
                : "☀️";

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            themeToggle.textContent = isLight ? "🌙" : "☀️";

            localStorage.setItem(
                "profileTheme",
                isLight ? "light" : "dark"
            );

        });

    }


    // ========================================
    // 3. EMAILJS GMAIL CONTACT FORM
    // ========================================

    const contactForm = document.getElementById("contact-form");

    const sendButton = document.getElementById("send-button");

    const formStatus = document.getElementById("form-status");

    // Run only on the page containing the contact form
    if (contactForm && sendButton && formStatus) {

        if (typeof emailjs === "undefined") {

            formStatus.textContent =
                "Email service could not load. Check your internet connection.";

            formStatus.style.color = "#fca5a5";

            console.error("EmailJS library is missing.");

        } else {

            // Initialize EmailJS
            emailjs.init({
                publicKey: "wRZ0k6Cv8kpZO71zk"
            });

            // Listen for form submission
            contactForm.addEventListener("submit", async function (event) {

                event.preventDefault();

                sendButton.disabled = true;

                sendButton.textContent = "Sending...";

                formStatus.textContent =
                    "Please wait. Sending your message...";

                formStatus.style.color = "#e5c3ff";

                try {

                    // Send message through EmailJS
                    const response = await emailjs.sendForm(
                        "service_42z9vqj",
                        "template_lkyw6b7",
                        contactForm
                    );

                    console.log("Email sent successfully:", response);

                    formStatus.textContent =
                        "Message sent successfully! Thank you for contacting me. 💜";

                    formStatus.style.color = "#86efac";

                    // Clear form after successful sending
                    contactForm.reset();

                } catch (error) {

                    console.error("EmailJS Error:", error);

                    formStatus.textContent =
                        "Message could not be sent. Please check your EmailJS settings and try again.";

                    formStatus.style.color = "#fca5a5";

                } finally {

                    sendButton.disabled = false;

                    sendButton.textContent = "Send Message ✉";

                }

            });

        }

    }

});
