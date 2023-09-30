const countriesList = document.getElementById("countriesList");
const searchInput = document.getElementById("search");
const regionSelect = document.getElementById("region");
const toggleModeButton = document.getElementById("toggleMode");
const dark = document.getElementById("dark");
const card = document.getElementsByClassName('country-card');

let darkMode = false;

toggleModeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    dark.classList.toggle("dark", darkMode);
    card.classList.toggle("dark", darkMode);
});
let countries = []; 

const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
};

const renderCountries = async () => {
     countries = await fetchCountries();
    countriesList.innerHTML = "";

    countries.forEach(country => {
        // Create country card element and populate with data
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}">
            <h2>${country.name.common}</h2>
            <h2>spell: ${country.altSpellings[0]}</h2>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
        `;

        card.addEventListener("click", () => {
            
            // Get the country code (you might need to extract it from the country object)
    const countryCode = country.cca2; // Replace with your actual country code source
    // Redirect to the detail page with the country code as a parameter
    window.location.href = `detail.html?code=${countryCode}`;
        });

        countriesList.appendChild(card);
    });
};

// Filter countries based on search input and region select
const filterCountries = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value.toLowerCase();

    const filteredCountries = countries.filter(country => {
        const nameMatches = country.name.common.toLowerCase().includes(searchText);
        const regionMatches = selectedRegion === "" || country.region.toLowerCase() === selectedRegion;
        return nameMatches && regionMatches;
    });

    renderFilteredCountries(filteredCountries);
};


const renderFilteredCountries = filteredCountries => {
    countriesList.innerHTML = "";

    filteredCountries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}">
            <h2>${country.name.common}</h2>
            <h2>spell: ${country.altSpellings[0]}</h2>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
        `;

        card.addEventListener("click", () => {
            // Implement country detail page and border countries here
        });

        countriesList.appendChild(card);
    });
};

searchInput.addEventListener("input", filterCountries);
regionSelect.addEventListener("change", filterCountries);

renderCountries();
