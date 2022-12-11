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
                <button onclick="loadPhoneDetail('${phone.slug}')" class="bg-primary text-white border border-3 rounded">Detail Info</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};

const loadPhoneDetail = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // load data
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
};
