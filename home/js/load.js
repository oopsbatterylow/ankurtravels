//load.js (this js file is created to load all my components folder t thoka files bilak one after another and ensuring the app.js is executaed only and onlu=y ater all the html files are loaded)

document.addEventListener("DOMContentLoaded", async () => {

    async function loadComponent(id, file) {
        const comp = document.getElementById(id);
        
        //error handling
        if (!comp) {
            console.error(`Component placeholder with ID "${id}" not found.`);
            return;
        }

        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            comp.innerHTML = html;
        } catch (error) {
            console.error(`Failed to load component ${file}:`, error);
        }
    }

    // loading all the components folder's file 
    await Promise.all([
        loadComponent("navbar", "components/navbar.html"),
        loadComponent("herosection", "components/herosection.html"),
        loadComponent("listings", "components/listings.html"),
        loadComponent("packages", "components/packages.html"), 
        loadComponent("contact", "components/contact.html"),
        loadComponent("about", "components/about.html"),
        loadComponent("feedback", "components/feedback.html"),
        loadComponent("footer", "components/footer.html")
    ]);

    console.log("All components loaded.");

    //only and only after my all files are load tatiya he app.js execute
    const script = document.createElement("script");
    script.src = "js/app.js";
    
    //ensuring bhul hoi jabo nalage (mane check koribole je init app logic exist before attempting to call)
    script.onload = () => {
        if (typeof initializeAppLogic === 'function') {
            initializeAppLogic();
        } else {
            console.error("Initialization failed: initializeAppLogic function not found in app.js.");
        }
    };
    
    document.body.appendChild(script);
});