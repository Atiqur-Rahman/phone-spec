const searchPhone = () => {
    const searchField = document.getElementById('input-search');
    const searchText = searchField.value;

    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.data));
};

const displaySearchResult = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    phones.forEach((phone) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src=${phone.image} class="card-img-top bg-color mx-auto" style="height:430px; width: 350px" alt="..." />
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
    const div = document.createElement('div');
    // div.classList.add('col');
    div.innerHTML = `
        <div class="card">
            <img src=${details.image} class="card-img-top bg-color mx-auto" style="height:430px; width: 350px" alt="..." />
            <div class="card-body bg-color">
                <h5 class="card-title">${details.name}</h5>
                <p>Release Date: ${details.releaseDate}</p>
                <p>Brand: ${details.brand}</p>
                <p class="card-text"><b>Main Feature</b></p>
                <p>Chipset: ${details.mainFeatures.chipSet}</p>
                <p>Display Size: ${details.mainFeatures.displaySize}</p>
                <p>Memory: ${details.mainFeatures.memory}</p>
                <p>Sensor: ${details.mainFeatures.sensors.map((sensor) => ' ' + sensor)}</p>
                <p>Storage: ${details.mainFeatures.storage}</p>
                <p><b>Connectivity</b></p>
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
