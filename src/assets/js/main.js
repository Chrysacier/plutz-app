"use strict";
let buttons_exp = document.querySelectorAll(".btn--exp");
let buttons_all = document.querySelectorAll(".btn--all");
let planet_title= document.querySelector(".planet__title");
let exp_planet= document.querySelector(".planet");
let planet_infos = document.querySelector(".planet__infos");
let planet_all_item = document.querySelectorAll(".planet-all__item");
let planet_data = document.querySelectorAll(".planet-data");
let btns_icon = document.querySelectorAll(".btn__icon")
let previous_data = "none";
let planetdata;

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
            planet_data.forEach(planet_data_mono => {
                let current_planet_data = planet_data_mono.getAttribute("data-planet")
                if (current_planet_data.toLocaleLowerCase() == planets.Name.toLowerCase()){
                    planet_data_mono.innerHTML = `${planets.Distance} millions km`
                   
                }

            });
        })
    });

}

buttons_exp.forEach(button => {
    button.addEventListener("click", (e) =>{
        e.preventDefault()
        let btn_data = button.getAttribute("data-type");
        let clicked_planet = exp_planet.getAttribute('data-planet');
        

        
        
        let measure = " "
        if(btn_data == "Distance"){
            measure = "millions km"
        }else if(btn_data == "Diameter"){
            measure = "km"
        }else if(btn_data == "Mass"){
            measure = "x10.24 kg"
        }else if(btn_data == "Rotation_Period"){
            measure = "hours"
        }else if(btn_data == "Gravity"){
            measure = "m/s²"
        }else if(btn_data == "Mean_Temperature"){
            measure = "°C"
        }else if(btn_data == "Number_of_satellites"){
            measure = "satellites"
        }
        let planet_filter = planetdata.filter((planets) =>{
            return planets.Name.toLowerCase().includes(clicked_planet.toLocaleLowerCase())
        })
        planet_filter.forEach(planets => {
            console.log(previous_data)           
            console.log(btn_data)           

            if(previous_data == btn_data){
                planet_title.innerHTML = `${planets.Name}`
                planet_infos.innerHTML = `${planets.Informations}`  
                previous_data = "none"
                
                btns_icon.forEach(btn_icon => {
                    btn_icon.classlist.remove("btn-icon--active") 

                });   

                
                
            }else{
                planet_title.innerHTML = `${planets[btn_data]} <span class="planet-data--unit">${measure}</span>`
                planet_infos.innerHTML = `${planets['Facts'][0][btn_data]}`  
                previous_data = btn_data 
                btns_icon.forEach(btn_icon => {
                    let btn_icon_data = btn_icon.getAttribute("data-type")
                    if(btn_data == btn_icon_data){
                        console.log("oui")
                         btn_icon.classlist.add("btn-icon--active")           
                    }
                }); 
            }
            
        });
    })
    
});
buttons_all.forEach(button => {
    button.addEventListener('click', (event) =>{
        let btn_data = button.getAttribute("data-type");
        let measure = " "
        if(btn_data == "Distance"){
            measure = "millions km"
        }else if(btn_data == "Diameter"){
            measure = "km"
        }else if(btn_data == "Mass"){
            measure = "x10.24 kg"
        }else if(btn_data == "Rotation_Period"){
            measure = "hours"
        }else if(btn_data == "Gravity"){
            measure = "m/s²"
        }else if(btn_data == "Mean_Temperature"){
            measure = "°C"
        }else if(btn_data == "Number_of_satellites"){
            measure = "satellites"
        }

        planet_all_item.forEach(planet_one_item => {
            let solo_planet_data = planet_one_item.getAttribute("data-planet");
            let planet_filter = planetdata.filter((planets) =>{
                return planets.Name.toLowerCase().includes(solo_planet_data.toLocaleLowerCase())
            })
            planet_filter.forEach(planets => {
                planet_data.forEach(planet_data_mono => {
                    let current_planet_data = planet_data_mono.getAttribute("data-planet")
                    if (current_planet_data.toLocaleLowerCase() == planets.Name.toLowerCase()){
                        planet_data_mono.innerHTML = `${planets[btn_data]} <span class="planet-data--unit">${measure}</span>`
                       
                    }
    
                });
            })
        });

    });
});