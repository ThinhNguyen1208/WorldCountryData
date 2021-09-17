const statistic_table = document.querySelector('.statistic-table');
const population_btn = document.querySelector('.population-btn');
const language_btn = document.querySelector('.language-btn');
const infor = document.querySelector('.infor');
const countries_box = document.querySelector('.countries-box');
const input_search = document.querySelector('.input-search');
const sort_name = document.querySelector('.sort-name');
const sort_capital = document.querySelector('.sort-capital');
const sort_population = document.querySelector('.sort-population');
const infor_countries = document.querySelector('.infor-countries');
const sorts_btn = document.querySelector('.sorts-btn');
const go_top = document.querySelector('.go-top');

function mostSpokenLanguages(countries) {
    languages = countries.map(function (country) {
        return country.languages;
    })
    languages = [].concat(...languages);
    languages.sort();

    let MostSpokenLg = [];
    while (languages.length != 0) {
        const languagesObject = {};
        let firstLg = languages[0];
        let i = 0;
        while (i < languages.length && languages[i].includes(firstLg)) {
            i++;
        };
        const categorizeLanguage = languages.splice(0, i);
        languagesObject.country = firstLg;
        languagesObject.count = categorizeLanguage.length;
        MostSpokenLg.push(languagesObject);
    }

    MostSpokenLg.sort(function (a, b) {
        if (a.count < b.count) {
            return 1;
        }
        if (a.count > b.count) {
            return -1;
        }
        return 0;
    })

    return MostSpokenLg.filter((language, index) => {
        return index < 10;
    })
}

function amountOfLanguages(countries) {
    languages = countries.map(function (country) {
        return country.languages;
    })
    languages = [].concat(...languages);
    languages = new Set(languages);
    return languages.size;
}


function render10MostLanguage() {
    const tenMostLanguages = mostSpokenLanguages(countriesObj);
    let html = ''
    const numberOfLg = amountOfLanguages(countriesObj);

    tenMostLanguages.forEach((language) => {
        html += `<div class="row">
        <p class="country">${language.country}</p>
        <div class="chart"><div style="width: ${(language.count / numberOfLg) * 100}%;"></div></div>
        <div class="amount">${language.count}</div>
    </div>`
    })
    statistic_table.innerHTML = html;
    infor.innerHTML = '10 Most Spoken languges in the world'
}

function mostPopulatedCountries(countries) {

    countries.sort((a, b) => {
        if (a.population < b.population) {
            return 1;
        }
        if (a.population > b.population) {
            return -1;
        }
        return 0;
    })

    return countries.filter((country, index) => index < 10);
}
function render10MostPopulation() {
    const mostCountries = mostPopulatedCountries(countriesObj);

    const numberOfPopulation = countriesObj.reduce((total, country) => total + country.population, 0);

    let html = `<div class="row">
    <p class="country">World</p>
    <div class="chart"><div style="width: 100%;"></div></div>
    <div class="amount">${convertComma(numberOfPopulation)}</div>
</div>`

    mostCountries.forEach((country) => {
        html += `<div class="row">
        <p class="country">${country.name}</p>
        <div class="chart"><div style="width: ${(country.population / numberOfPopulation) * 100}%;"></div></div>
        <div class="amount">${convertComma(country.population)}</div>
    </div>`
    })
    statistic_table.innerHTML = html;
    infor.innerHTML = 'Population of countries'

}

function renderPopulatedStatistic(countries) {
    const numberOfPopulation = countriesObj.reduce((total, country) => total + country.population, 0);
    let html = `<div class="row">
    <p class="country">World</p>
    <div class="chart"><div style="width: 100%;"></div></div>
    <div class="amount">${convertComma(numberOfPopulation)}</div>
</div>`
    countries.forEach(country => {
        const name = country.querySelector(".country-name").textContent;
        let population = country.querySelector('.population').textContent;
        population = population.split(',');
        population = Number(population.join(''));
        html += `<div class="row">
        <p class="country">${name}</p>
        <div class="chart"><div style="width: ${(population / numberOfPopulation) * 100}%;"></div></div>
        <div class="amount">${convertComma(population)}</div>
    </div>`
    })
    statistic_table.innerHTML = html;

}

function convertComma(total) {
    total = total.toString();
    total = total.split('');
    let initialIndex = total.length - 1;
    for (let i = total.length - 1; i > 0; i--) {
        if (i == initialIndex - 2) {
            total.splice(i, 0, ',');
            initialIndex = i - 1;
        }
    }
    return total.join('');
}

function renderCountriesBox(countries) {
    countries.forEach((country) => {
        let html = `  <div class="country-flag"><img src="${country.flag}" ></div>
        <h3 class="country-name">${country.name.toUpperCase()}</h3>
        <div class="country-infor">
            <p class="infors">Capital: <span class = "capital-name">${country.capital}</span></p>
            <p class="infors">Languages: <span class="languages">${country.languages.join(', ')}</span></p>
            <p class="infors">Population: <span class="population">${convertComma(country.population)}</span></p>
        </div>`
        const boxElement = document.createElement('div');
        boxElement.classList.add('country-box');
        boxElement.classList.add('col-m-3');
        boxElement.classList.add('col-s-1');
        boxElement.classList.add('active');
        boxElement.innerHTML = html;
        countries_box.appendChild(boxElement);
    })
}

function handleKeyUp(e) {
    const countries_item = document.querySelectorAll('.country-box');
    let value = this.value.toUpperCase();
    let count = 0;
    const countriesActive = [];
    countries_item.forEach((country) => {
        const name = country.querySelector(".country-name").textContent.toUpperCase();
        const capital = country.querySelector('.capital-name').textContent.toUpperCase();
        const languages = country.querySelector('.capital-name').textContent.toUpperCase();
        if (name.includes(value) || capital.includes(value) || languages.includes(value)) {
            country.style.display = 'block';
            country.classList.add('active');
            count++;
            countriesActive.push(country);
        }
        else {
            country.style.display = 'none';
            country.classList.remove('active');
        }
    })

    renderPopulatedStatistic(countriesActive);
    infor_countries.textContent = `${count} countries satisfied the search criteria`;
    if (value == '') {
        const countries = Array.from(countries_item)
        countries.sort((a, b) => {
            const name1 = a.querySelector(".country-name").textContent.toUpperCase();
            const name2 = b.querySelector(".country-name").textContent.toUpperCase();
            if (name1 > name2) return 1;
            if (name1 < name2) return -1;
            return 0;
        })
        infor_countries.textContent = '';
        countries.forEach(country => {
            countries_box.appendChild(country);
        })
        render10MostPopulation()

    }

}
function sortMode(sortLabel) {

    const sortsBtn = sorts_btn.querySelectorAll('.fas');
    sortsBtn.forEach((sortBtn) => {
        if (sortBtn != sortLabel[0] && sortBtn != sortLabel[1] && sortBtn.classList.contains('active')) {
            sortBtn.classList.remove('active');
        }
    })

    if (!sortLabel[0].classList.contains('active') && !sortLabel[1].classList.contains('active')) {
        sortLabel[0].classList.add('active');
    } else {
        sortLabel[0].classList.toggle('active');
        sortLabel[1].classList.toggle('active');
    }


    let number;
    if (sortLabel[0].classList.contains('active')) {
        number = 1;
    }
    else {
        number = -1;
    }
    return number;
}

function handleSortByName() {

    const sortLabel = this.querySelectorAll('.fas');
    let number = sortMode(sortLabel);
    sortByName(number);

}

function sortByName(number) {
    const countries_item = document.querySelectorAll('.country-box');
    const countriesActive = [];


    countries_item.forEach(country => {
        if (country.classList.contains('active')) {
            countriesActive.push(country);
        }
    })
    if (countriesActive.length >= 1) {
        countriesActive.forEach((country) => {
            countries_box.removeChild(country);
        })

        countriesActive.sort((a, b) => {
            const name1 = a.querySelector(".country-name").textContent.toUpperCase();
            const name2 = b.querySelector(".country-name").textContent.toUpperCase();
            if (name1 > name2) return number;
            if (name1 < name2) return -number;
            return 0;
        })

        countriesActive.forEach((country) => {
            countries_box.appendChild(country);
        })
    }

}


function sortByCapital(number) {
    const countries_item = document.querySelectorAll('.country-box');
    const countriesActive = [];


    countries_item.forEach(country => {
        if (country.classList.contains('active')) {
            countriesActive.push(country);
        }
    })
    if (countriesActive.length >= 1) {
        countriesActive.forEach((country) => {
            countries_box.removeChild(country);
        })

        countriesActive.sort((a, b) => {
            const name1 = a.querySelector(".capital-name").textContent.toUpperCase();
            const name2 = b.querySelector(".capital-name").textContent.toUpperCase();
            if (name1 > name2) return number;
            if (name1 < name2) return -number;
            return 0;
        })

        countriesActive.forEach((country) => {
            countries_box.appendChild(country);
        })
    }
}


function handleSortByCapital() {
    const sortLabel = this.querySelectorAll('.fas');
    let number = sortMode(sortLabel);
    sortByCapital(number);
}


function sortByPopulation(number) {
    const countries_item = document.querySelectorAll('.country-box');
    const countriesActive = [];


    countries_item.forEach(country => {
        if (country.classList.contains('active')) {
            countriesActive.push(country);
        }
    })
    if (countriesActive.length >= 1) {
        countriesActive.forEach((country) => {
            countries_box.removeChild(country);
        })

        countriesActive.sort((a, b) => {
            let name1 = a.querySelector(".population").textContent.split(',');
            let name2 = b.querySelector(".population").textContent.split(',');
            name1 = Number(name1.join(''));
            name2 = Number(name2.join(''))
            if (name1 > name2) return number;
            if (name1 < name2) return -number;
            return 0;
        })

        countriesActive.forEach((country) => {
            countries_box.appendChild(country);
        })
    }
}


function handleSortByPopulation() {
    const sortLabel = this.querySelectorAll('.fas');
    let number = sortMode(sortLabel);
    sortByPopulation(number);
}

function renderPopulation() {
    const countries_item = document.querySelectorAll('.country-box');
    const countriesActive = [];
    countries_item.forEach((country) => {
        if(country.classList.contains('active')){
            countriesActive.push(country);
        }
    })
    if(countriesActive.length == countries_item.length){
        render10MostPopulation();
    }
    else{
        renderPopulatedStatistic(countriesActive);
        infor.innerHTML = 'Population of countries'
    }
}

function main() {
    // render10MostLanguage();
    renderCountriesBox(countriesObj);
    render10MostPopulation()
    population_btn.addEventListener('click', renderPopulation);
    language_btn.addEventListener('click', render10MostLanguage);
    input_search.addEventListener('keyup', handleKeyUp);
    sort_name.addEventListener('click', handleSortByName);
    sort_capital.addEventListener('click', handleSortByCapital);
    sort_population.addEventListener('click', handleSortByPopulation);
    window.onscroll = function () {
        if(document.documentElement.scrollTop > 200){
            go_top.style.display = 'block'
        }
        else {
            go_top.style.display = 'none'
        }
    }
    go_top.onclick = function() {
        document.documentElement.scrollTop = 0;
    }
    go_top.onmousedown = function() {
        this.style.transform = 'scale(0.7)';
    }
    go_top.onmouseup = function() {
        this.style.transform = 'scale(1)';
    }
}

main()