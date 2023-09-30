const toggleModeButton = document.getElementById("toggleMode");
const dark = document.getElementById("dark");
const card = document.getElementsByClassName('country-card');

let darkMode = false;

toggleModeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    dark.classList.toggle("dark", darkMode);
    document.getElementsByClassName('country-detail-card').style.backgroundColor ='black';
});
const countryDetail = document.getElementById("countryDetail");
let countryData = []
// Function to fetch detailed data for a specific country
const fetchCountryDetail = async countryCode => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                                    //   https://restcountries.com/v3.1/name/{name}
        const data = await response.json();
       
        return data;
    } catch (error) {
        console.error("Error fetching country detail:", error);
    }
};
  
// Function to render country detail information
const renderCountryDetail = async countryCode => {
    countryData =await fetchCountryDetail(countryCode);
     console.log(countryData[0]);
console.log(`this is country data ${countryData[0]}`);
    // Create detail card and populate with data
    const detailCard = document.createElement("div");
    detailCard.classList.add("country-detail-card");
    detailCard.innerHTML = `
    <img src="${countryData[0].flags.svg}">
        <h2>${countryData[0].name.common}</h2>
        <p>Population: ${countryData[0].population}</p>
        <p>Region: ${countryData[0].region}</p>
        <p>Subregion: ${countryData[0].subregion}</p>
        <!-- Add more details as needed -->
    `;

    // Append detail card to the detail page
    countryDetail.appendChild(detailCard);
};

// Get the country code from the URL parameters (you might need to parse the URL)
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get("code");

// Call the render function with the fetched country code
renderCountryDetail(countryCode);
