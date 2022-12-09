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
            <img src=${phone.image} class="card-img-top mx-auto" style="height:430px; width: 350px" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text"><strong>Brand: ${phone.brand}</strong></p>
                <button class="bg-primary text-white border border-3 rounded">Detail Info</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
};
