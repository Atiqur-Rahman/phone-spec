// toggle spinner function
const toggleSpinner = (displaySpinner) => {
    document.getElementById('spinner').style.display = displaySpinner;
};
toggleSpinner('none');

// toggle displaySearchResult function
const toggleSearchResult = (displayResult) => {
    document.getElementById('search-result').style.display = displayResult;
};

// search box and load data
const searchPhone = () => {
    const searchField = document.getElementById('input-search');
    const searchText = searchField.value;

    searchField.value = '';
    document.getElementById('error-message').textContent = '';

    if (searchText === '') {
        const errorMessage = document.getElementById('error-message');
        // errorMessage.textContent = '';
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.color = 'red';
        div.style.fontSize = '32px';
        div.innerHTML = `
            <p><b>Please write something to search</b></p>
        `;
        errorMessage.appendChild(div);
    } else {
        document.getElementById('phone-detail').textContent = '';
        toggleSpinner('block');
        toggleSearchResult('none');

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // load data
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.data));
    }
};

// display the searched data
const displaySearchResult = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones.length === 0) {
        const errorMessage = document.getElementById('error-message');
        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.color = 'red';
        div.style.fontSize = '32px';
        div.innerHTML = `
            <p><b>No results found.</b></p>
        `;
        errorMessage.appendChild(div);
    } else {
        /* phones.forEach((phone) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <div class="pt-3 pb-3 mx-auto">
                        <img src=${phone.image} class="card-img-top bg-color " style="height:430px; width: 350px" alt="..." />
                    </div>
                    <div class="card-body bg-color">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text"><strong>Brand: ${phone.brand}</strong></p>
                        <button onclick="loadPhoneDetail('${phone.slug}')" class="bg-primary text-white border border-3 rounded-2">Detail Info</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        }); */
        for (let phone = 0; phone < (phones.length < 20 ? phones.length : 20); phone++) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card">
                    <div class="pt-3 pb-3 mx-auto">
                        <img src=${phones[phone].image} class="card-img-top bg-color " style="height:430px; width: 350px" alt="..." />
                    </div>
                    <div class="card-body bg-color">
                        <h5 class="card-title">${phones[phone].phone_name}</h5>
                        <p class="card-text"><strong>Brand: ${phones[phone].brand}</strong></p>
                        <button onclick="loadPhoneDetail('${phones[phone].slug}')" class="bg-primary text-white border border-3 rounded-2">Detail Info</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        }
    }
    toggleSpinner('none');
    toggleSearchResult('flex');
};

// load detail data
const loadPhoneDetail = async (id) => {
    document.getElementById('phone-detail').textContent = '';
    toggleSpinner('block');
    toggleSearchResult('none');

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // load data
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetail(data.data);
};

// display detail data
const showPhoneDetail = (details) => {
    console.log(details);
    const phoneDetail = document.getElementById('phone-detail');
    // phoneDetail.textContent = '';
    const div = document.createElement('div');
    // div.classList.add('col');
    div.innerHTML = `
        <div class="card mt-5" style="width: 600px;">
            <div class="pt-3 pb-3 mx-auto">
                <img src=${details.image} class="card-img-top bg-color " style="height:430px; width: 350px" alt="..." />
            </div>
            <div class="card-body bg-color">
                <h5 class="card-title">${details.name}</h5>
                <p>Release Date: ${details.releaseDate ? details.releaseDate : 'Not found'}</p>
                <p>Brand: ${details.brand}</p>
                <h6><b>Main Feature</b></h6>
                <p>Chipset: ${details.mainFeatures.chipSet}</p>
                <p>Display Size: ${details.mainFeatures.displaySize}</p>
                <p>Memory: ${details.mainFeatures.memory}</p>
                <p>Sensor: ${details.mainFeatures.sensors.map((sensor) => ' ' + sensor)}</p>
                <p>Storage: ${details.mainFeatures.storage}</p>
                <h6><b>Connectivity</b></h6>
                <p>Bluetooth: ${details.others.Bluetooth}</p>
                <p>GPS: ${details.others.GPS}</p>
                <p>NFC: ${details.others.NFC}</p>
                <p>Radio: ${details.others.Radio}</p>
                <p>USB: ${details.others.USB}</p>
                <p>WLAN: ${details.others.WLAN}</p>
            </div>
        </div>
    `;
    phoneDetail.appendChild(div);
    toggleSpinner('none');
    toggleSearchResult('flex');
};
