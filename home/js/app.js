// app.js - all the logics of the component files(html files) are written here 

console.log("APP.JS LOADED SUCCESSFULLY!");

//main initailize func
function initializeAppLogic() {
    console.log("Initializing app logic...");

    //sticky header + hero section r olop logic
    const header = document.getElementById("main-header");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // Sticky header
        if (header) {
            if (scrollPosition > 50) header.classList.add("scrolled");
            else header.classList.remove("scrolled");
        }

        // Parallax hero background
        const hero = document.getElementById("hero-slider");
        if (hero) {
            hero.style.backgroundPositionY = -(scrollPosition * 0.5) + "px";
        }
    });

    //hero slider  
    const sliderContainer = document.querySelector(".slider-container");
    const slides = document.querySelectorAll(".slide");

    if (sliderContainer && slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        setInterval(nextSlide, slideInterval);
    }



    // car listing arrow keys(btns)'s func
    const carContainer = document.querySelector(".car-scroll-container");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");

    if (carContainer && leftBtn && rightBtn) {

        const getScrollAmount = () => {
            const card = document.querySelector(".car-card");
            return card ? card.offsetWidth + 30 : 380;
        };

        leftBtn.addEventListener("click", () => {
            carContainer.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            carContainer.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        });
    }

    // nav bar's toogle bar (for phn )
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.classList.toggle("active");
            mobileNav.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isExpanded);
            document.body.style.overflow = isExpanded ? "hidden" : "auto";
        });

        document.querySelectorAll("#mobile-nav a").forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mobileNav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", false);
                document.body.style.overflow = "auto";
            });
        });
    }

    //package section animation
    const packageCards = document.querySelectorAll(".package-card");

    // for big screen
    const desktopObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth >= 992) { 
                packageCards.forEach(card => card.classList.add("visible"));
            }
        });
    }, { threshold: 0.3 });

    // Ensururing  the element to observe is available before observing
    const packagesSectionAnimTarget = document.getElementById("packages");
    if (packagesSectionAnimTarget) {
        desktopObserver.observe(packagesSectionAnimTarget);
    }


    // MOBILE ANIMATION package sectin 
    const mobObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth <= 768) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    packageCards.forEach((card, idx) => {
        if (window.innerWidth <= 768) {
            if (idx === 0) card.classList.add("reveal-top");
            if (idx === 1) card.classList.add("reveal-center");
            if (idx === 2) card.classList.add("reveal-bottom");
            mobObserver.observe(card);
        }
    });


    //package section's contact menu
    const packagesSection = document.getElementById("packages");
    const actionOverlay = document.getElementById("action-menu-overlay");
    const closeMenuBtn = document.querySelector(".menu-close-btn");
    const callLink = document.getElementById("action-call");
    const whatsappLink = document.getElementById("action-whatsapp");
    const packageNameDisplay = document.getElementById("selected-package-name");
    const CONTACT_NUMBER = "+919435796758"; 

    function openActionMenu(packageName) {
        const defaultMessage = `Hello, I am interested in the ${packageName} package. Can you please share more details?`;
        const whatsappMessageEncoded = encodeURIComponent(defaultMessage);
        
        callLink.href = `tel:${CONTACT_NUMBER}`;
        whatsappLink.href = `https://wa.me/${CONTACT_NUMBER.replace(/[^\d+]/g, '')}?text=${whatsappMessageEncoded}`; 
        
        packageNameDisplay.textContent = packageName;
        actionOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeActionMenu() {
        actionOverlay.classList.remove("open");
        document.body.style.overflow = "auto";
    }

    // LISTENER INTEGRATED
    if (packagesSection && actionOverlay) {
        packagesSection.addEventListener("click", (event) => {
            const cardElement = event.target.closest(".clickable-card"); 

            if (cardElement) {
                const packageName = cardElement.getAttribute("data-package"); 
                
                if (packageName) {
                    openActionMenu(packageName);
                }
            }
        });

        // Close listeners
        closeMenuBtn.addEventListener("click", closeActionMenu);
        
        actionOverlay.addEventListener("click", (event) => {
            if (event.target === actionOverlay) {
                closeActionMenu();
            }
        });
    }


console.log("APP.JS LOADED SUCCESSFULLY!");


}

//load.js will call my app.js after the component wala folder r files are loaded 

document.addEventListener("DOMContentLoaded", () => {
    console.log("Base HTML loaded. Waiting for components...");
});

