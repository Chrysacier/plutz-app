"use strict";
let buttons = document.querySelectorAll(".btn");
let planet_title= document.querySelector(".planet__title");
let planet_infos = document.querySelector(".planet__infos");
let planet_all_item = document.querySelectorAll(".planet-all__item");
let solo_planet_names = document.querySelectorAll(".solo-planet-name ");
let planetdata

const json = fetch('assets/js/data.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    planetdata = data
    view_all_data();
});

function view_all_data(){
    planet_all_item.forEach(planet_one_item => {
        let solo_planet_data = planet_one_item.getAttribute("data-planet");
        let planet_filter = planetdata.filter((planets) =>{
            return planets.Name.toLowerCase().includes(solo_planet_data.toLocaleLowerCase())
        })
        planet_filter.forEach(planets => {
            solo_planet_names.forEach(solo_planet_name => {
                let current_planet_data = solo_planet_name.getAttribute("data-planet")
                if (current_planet_data.toLocaleLowerCase() == planets.Name.toLowerCase()){
                    solo_planet_name.innerHTML = `${planets.Name}`
                   
                }

            });
        })
    });

}

buttons.forEach(button => {
    button.addEventListener("click", (e) =>{
        e.preventDefault()
        let btn_data = button.getAttribute("data-type");
        //let clicked_planet = button.getAttribute('data-planet');
        let clicked_planet = "Earth"
    
        let planet_filter = planetdata.filter((planets) =>{
            return planets.Name.toLowerCase().includes(clicked_planet.toLocaleLowerCase())
        })
        planet_filter.forEach(planets => {
            planet_title.innerHTML = `${planets[btn_data]}`
            planet_infos.innerHTML = `${planets['Facts'][0][btn_data]}`
        });
    })
    
});