function initializeIntro() {
    console.log("Intro Animation and Logic Loaded");
    
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', goToHome);
}


//btn click = home page redirecting
function goToHome() {
    window.location.href = "/home/home.html"; 
}


initializeIntro();