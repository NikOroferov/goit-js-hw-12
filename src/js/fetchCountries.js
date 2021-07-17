import Notiflix from "notiflix";

function getCountries(countryName) {
    const BASE_URL = 'https://restcountries.eu/';
    const endpoint = `rest/v2/name/${countryName}`;
    let url = BASE_URL + endpoint;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name!"));
            }
        });
}


export {getCountries}