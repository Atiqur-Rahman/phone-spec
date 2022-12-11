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
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data.data));
    }
};

const displaySearchResult = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach((phone) => {
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
    });
};

const loadPhoneDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // load data
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetail(data.data);
};

const showPhoneDetail = (details) => {
    console.log(details);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
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
};
