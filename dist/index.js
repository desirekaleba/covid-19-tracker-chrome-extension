const apiEndpoint = 'https://coronavirus-19-api.herokuapp.com/countries';
let errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const activeCases = document.querySelector('.active-cases');
const totalCases = document.querySelector('.total-cases');
const totalRecovered = document.querySelector('.total-recovered');
const totalDeaths = document.querySelector('.total-deaths');
const totalTests = document.querySelector('.total-tests');
const todayCases = document.querySelector('.today-cases');
const todayDeaths = document.querySelector('.today-deaths');
const results = document.querySelector('.result-container');

results.style.display = 'none';
loading.style.display = 'none';
errors.textContent = '';

// * Form
const form = document.querySelector('.form-data');
// * Country name
const Country = document.querySelector('.country-name');

/* 
 * @searchForCountry
 * @void
 */

const searchForCountry = async countryName => {
    loading.style.display = 'block';
    errors.textContent = '';

    try {
        const response = await axios.get(`${apiEndpoint}/${countryName}`);
        console.log(response);
        if (response.data === 'Country not found') {
            throw new Error('Country not found!');
        }
        loading.style.display = 'none';
        activeCases.textContent = response.data.active;
        todayCases.textContent = response.data.todayCases;
        todayDeaths.textContent = response.data.todayDeaths;
        totalCases.textContent = response.data.cases;
        totalRecovered.textContent = response.data.recovered;
        totalDeaths.textContent = response.data.deaths;
        totalTests.textContent = response.data.totalTests;
        results.style.display = 'block';

    } catch (error) {
        loading.style.display = 'none';
        results.style.display = 'none';
        errors.textContent = error;
    }
};

// * handleSubmit
const handleSubmit = async e => {
    e.preventDefault();
    searchForCountry(Country.value.trim());
};

form.addEventListener('submit', e => handleSubmit(e));