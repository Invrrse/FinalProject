// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

import { houses } from './houses'

for (let m of houses) {
    let m_thumb = document.getElementById('m' + m.id)
    m_thumb.innerHTML = `
    <div class="card text-center my-2 text-success">
        <img src="${m.image}" alt="${m.address}" class="img-thumbnail p-0"/>
        <p>$${m.cost}</p>
    </div>
    `

    m_thumb.onclick = function () {
        displayHouse(m)
    }
}

let featured_house = document.querySelector(".featured")

function displayHouse(house) {
    featured_house.innerHTML = `
        <div class="card">
            <div class="card-header">${house.city}</div>
            <img src="${house.image}" class="card-img-top" alt="${house.title}">
            <div class="card-footer text-muted">
                <div class="row row-cols-3">
                    <div class="col"><strong>Price: </strong>${house.cost}</div>
                    <div class="col"><strong>Bedrooms: </strong>${house.bedrooms}</div>
                    <div class="col"><strong>Bathrooms: </strong>${house.bathrooms}</div>
                </div>
            </div>
        </div>
    `
}

function searchHouses(event) {
    event.preventDefault()

    let input = document.querySelector('[type ="search"]').value || ""
    let count = 0;
    for (let m of houses) {
        if (m.city.toUpperCase().indexOf(input.toUpperCase()) == -1) {
            document.querySelector(`#m${m.id}`).classList.add('d-none')
        }
        else {
            document.querySelector(`#m${m.id}`).classList.remove('d-none')
            count++;
        }
        featured_house.innerHTML = count == 0 ? 'Nothing was found' : ''
    }

}


function hideForm() {
    document.querySelector("#new_form").classList.add('d-none')
    document.querySelector("#home").classList.remove('d-none')
}

function hideCards() {
    document.querySelector("#new_form").classList.remove('d-none')
    document.querySelector("#home").classList.add('d-none')
}

document.querySelector("button").onclick = searchHouses
document.querySelector('[type ="search"]').onsearch = searchHouses
document.querySelector("form").onsubmit = searchHouses

document.querySelector("#login").onclick = hideCards
document.querySelector("#sign_up").onclick = hideCards
document.querySelector(".to-cancel").onclick = hideForm

