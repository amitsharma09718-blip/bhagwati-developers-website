"use strict";

/* =========================================================
   BHAGWATI DEVELOPERS
   Main JavaScript
   ========================================================= */


/* =========================
   1. MOBILE MENU
   ========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });
}


/* =========================
   2. CLOSE MOBILE MENU
   AFTER CLICKING LINK
   ========================= */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {
            navbar.classList.remove("active");
        }

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }
        }

    });

});


/* =========================
   3. ACTIVE NAVIGATION
   ========================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});




/* =========================
4. REGISTRATION FORM
========================= */

const registrationForm =
    document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();


        /* =========================
           NAME VALIDATION
           ========================= */

        if (name.length < 3) {

            alert("Please enter your full name.");

            document.getElementById("name").focus();

            return;
        }


        /* =========================
           PHONE VALIDATION
           ========================= */

        const phonePattern = /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(phone)) {

            alert(
                "Please enter a valid 10-digit Indian mobile number."
            );

            document.getElementById("phone").focus();

            return;
        }


        /* =========================
           EMAIL VALIDATION
           ========================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            document.getElementById("email").focus();

            return;
        }


        /* =========================
           SUBMIT TO NETLIFY
           ========================= */

        const submitButton =
            registrationForm.querySelector(".submit-btn");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Submitting...";
        }


        try {

            const formData =
                new FormData(registrationForm);

            await fetch("/", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    new URLSearchParams(formData).toString()

            });


            /* =========================
               SUCCESS REDIRECT
               ========================= */

            window.location.href = "/success.html";


        } catch (error) {

            console.error(
                "Form submission error:",
                error
            );

            alert(
                "Something went wrong. Please try again."
            );


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'Submit Registration <i class="fa-solid fa-arrow-right"></i>';
            }

        }

    });

}


/* =========================
   5. PHONE NUMBER INPUT
   ONLY NUMBERS
   ========================= */

const phoneInput =
    document.getElementById("phone");


if (phoneInput) {

    phoneInput.addEventListener("input", function () {

        /*
         Remove everything except numbers
        */

        this.value =
            this.value.replace(/\D/g, "");


        /*
         Maximum 10 digits
        */

        if (this.value.length > 10) {

            this.value =
                this.value.substring(0, 10);

        }

    });

}


/* =========================
   6. SCROLL TO TOP
   ========================= */

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        document.body.classList.add("scrolled");

    } else {

        document.body.classList.remove("scrolled");

    }

});


/* =========================
   7. PROPERTY ENQUIRE BUTTONS
   ========================= */

const enquiryButtons =
    document.querySelectorAll(".property-btn");


enquiryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /*
         Registration section par
         automatically scroll hoga.
        */

        const registerSection =
            document.getElementById("register");


        if (registerSection) {

            registerSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================
   8. CURRENT YEAR
   ========================= */

const footerYear =
    document.querySelector(".footer-bottom p");


if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.innerHTML =
        footerYear.innerHTML.replace(
            "2026",
            currentYear
        );

}


/* =========================
   9. PAGE LOAD
   ========================= */

window.addEventListener("load", function () {

    document.body.classList.add("page-loaded");

});