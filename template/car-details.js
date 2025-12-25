//template.js - this js file is made to fetch data from init folder's data.json and basic lof=gic fr the template.html

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('contactModal');
    const openBtnFloat = document.getElementById('openModalFloat'); 
    const openBtnNav = document.getElementById('openModalNavBtn');
    const openBtnBody = document.getElementById('openModalBtn');
    const closeModal = document.querySelector('.close-btn');

    function openModal() {
        modal.style.display = 'block';
    }

    function closeMod() {
        modal.style.display = 'none';
    }

    if (openBtnFloat) openBtnFloat.addEventListener('click', openModal);
    if (openBtnNav) openBtnNav.addEventListener('click', openModal);
    if (openBtnBody) openBtnBody.addEventListener('click', openModal);
    if (closeModal) closeModal.addEventListener('click', closeMod);

    window.addEventListener('click', (event) => {
        if (event.target === modal) closeMod();
    });

 
    const tabs = document.querySelectorAll('.data-tab');
    const panels = document.querySelectorAll('.data-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });




    const params = new URLSearchParams(window.location.search);
    const carId = params.get("id"); 

    if (!carId) {
        console.error("URL Error: No ID found in URL. Cannot fetch car details.");
        return;
    }

   
    fetch("../init/data.json") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load data. Status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const car = data.find(item => item.id === carId);

            if (!car) {
                console.error("Data Error: Car not found for ID:", carId);
                document.getElementById("car-title").textContent = "Error 404: Vehicle Not Found";
                document.getElementById("car-subtitle").textContent = `Could not find vehicle with ID: ${carId}`;
                return;
            }

      

            
            document.getElementById("car-title").textContent = car.title;
            document.getElementById("car-subtitle").textContent = car.subtitle;
            document.getElementById("car-description").textContent = car.description;
            document.getElementById("car-summary-price").textContent = car.summaryPrice + ' / MIN. DAY'; 
            document.getElementById("car-image").src = `..${car.imagePath}`; 
            document.getElementById("car-image").alt = car.title;

         
            const dataStreamItems = document.querySelectorAll('#data-stream-bar .data-item span');
            if (dataStreamItems.length === 4 && car.specs && car.specs.length >= 4) {
                 dataStreamItems[0].textContent = `${car.specs[0].label}: ${car.specs[0].value}`;
                 dataStreamItems[1].textContent = `${car.specs[1].label}: ${car.specs[1].value}`;
                 dataStreamItems[2].textContent = `${car.specs[2].label}: ${car.specs[2].value}`;
                 dataStreamItems[3].textContent = `${car.specs[3].label}: ${car.specs[3].value}`;
            }

            const kmContainerBody = document.getElementById("km-rate-body"); 
            if (kmContainerBody && car.rates && car.rates.kmRates) {
                console.log('DEBUG: KM Rates data array:', car.rates.kmRates);
                kmContainerBody.innerHTML = car.rates.kmRates.map(rate => `
                    <tr>
                        <td>${rate.area}</td>
                        <td>${rate.acActive}</td>
                        <td>${rate.noAc}</td>
                    </tr>
                `).join('');
            } else {
                console.error("DEBUG: Failed to render KM Rates. Element or data (car.rates.kmRates) missing.");
                if (kmContainerBody) kmContainerBody.innerHTML = '<tr><td colspan="3">Data Structure Error or Data Not Found.</td></tr>';
            }

       
            const dailyContainerBody = document.getElementById("daily-min-body"); 
            if (dailyContainerBody && car.rates && car.rates.dailyMins) {
                console.log('DEBUG: Daily Mins data array:', car.rates.dailyMins);
                dailyContainerBody.innerHTML = car.rates.dailyMins.map(min => `
                    <tr>
                        <td>${min.boundary}</td>
                        <td>${min.distance}</td>
                        <td>${min.charge}</td>
                    </tr>
                `).join('');
            } else {
                console.error("DEBUG: Failed to render Daily Mins. Element or data (car.rates.dailyMins) missing.");
                if (dailyContainerBody) dailyContainerBody.innerHTML = '<tr><td colspan="3">Data Structure Error or Data Not Found.</td></tr>';
            }

          
            const driverContainerList = document.getElementById("driver-fees-list");
            if (driverContainerList && car.driverFees) {
                console.log('DEBUG: Driver Fees data array:', car.driverFees);
                driverContainerList.innerHTML = car.driverFees.map(fee => `
                    <li><strong>${fee.label}:</strong> ${fee.amount}</li>
                `).join('');
            } else {
                console.error("DEBUG: Failed to render Driver Fees. Element or data (car.driverFees) missing.");
                if (driverContainerList) driverContainerList.innerHTML = '<li>Data Structure Error or Data Not Found.</li>';
            }

      
            const protocolContainerList = document.getElementById("protocol-list");
            if (protocolContainerList && car.protocol) {
                console.log('DEBUG: Protocol data array:', car.protocol);
                protocolContainerList.innerHTML = car.protocol.map(rule => `<li>${rule}</li>`).join('');
            } else {
                console.error("DEBUG: Failed to render Protocol. Element or data (car.protocol) missing.");
                if (protocolContainerList) protocolContainerList.innerHTML = '<li>Data Structure Error or Data Not Found.</li>';
            }

          
            const defaultMessage = `I'm interested in booking the ${car.title}. Please provide details. (ID: ${carId})`;
            document.getElementById("call-link").href = "tel:" + car.contact.callNumber;
            document.getElementById("whatsapp-link").href = `https://wa.me/${car.contact.whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
        })
        .catch(error => {
            console.error("Critical Error during data fetching or parsing:", error);
            document.getElementById("car-title").textContent = "System Error: Data Load Failed";
            document.getElementById("car-subtitle").textContent = "Check console for network details.";
        });
});