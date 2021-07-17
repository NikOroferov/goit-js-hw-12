import './css/styles.css'
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { getCountries } from './js/fetchCountries';
import cardsMarkup from './templates/countries-list.hbs'
import cardMarkup from './templates/country-card.hbs'



const inputEl = document.getElementById('search-box');
let countryListEl = document.querySelector('.country-list');
let countryInfoEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 500;

inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
    event.preventDefault();
    let countryName = event.target.value.trim('');

    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';

    getCountries(countryName)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (countries.length === 1) {
                descCountry(countries[0]);
            } else if (countries.length >= 2 && countries.length <= 10) {
                countriesList(countries);
            };
        })
        .catch(error => {
            console.log(error);
        });
    
    function descCountry(...countries) {
        const markup = cardMarkup(countries[0]);
        const countryLanguage = countries[0].languages;
        const languages = countryLanguage.map(lang => lang.name).join(', ');
        const languagesMarkup = `<p class="country_detail">Languages: ${languages} </p>`;
        countryInfoEl.insertAdjacentHTML('afterbegin', languagesMarkup);
        countryInfoEl.insertAdjacentHTML('afterbegin', markup);
    };

    function countriesList(countries) {
        const markup = cardsMarkup(countries)
        countryListEl.innerHTML = markup;
    };
}