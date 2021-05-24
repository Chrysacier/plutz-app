"use strict";
let buttons_exp = document.querySelectorAll(".btn--exp");
let buttons_all = document.querySelectorAll(".btn--all");
let buttons_filter = document.querySelectorAll(".btn--filter");
let planet_title = document.querySelector(".title--planet-slider");
let exp_planet = document.querySelector(".planet");
let planet_infos = document.querySelector(".planet__infos");
let planet_all_item = document.querySelectorAll(".planet-all__item");
let planet_data = document.querySelectorAll(".planet-data");
let btns_icon = document.querySelectorAll(".btn-data");
let previous_data = "Name";
let planetdata;
let filter_index = 0;
let previous_filter_index = 0;
let check = false;
const json = fetch('assets/js/data.json').then(function(response) {
    return response.json();
}).then(function(data) {
    planetdata = data;
    view_all_data();
});

function view_all_data() {
    planet_all_item.forEach(planet_one_item => {
        let solo_planet_data = planet_one_item.getAttribute("data-planet");
        let planet_filter = planetdata.filter((planets) => {
            return planets.Name.toLowerCase().includes(solo_planet_data.toLocaleLowerCase());
        });
        planet_filter.forEach(planets => {
            planet_data.forEach(planet_data_mono => {
                planet_data_mono.classList.add("hidden");
                let current_planet_data = planet_data_mono.getAttribute("data-planet");
                if (current_planet_data.toLocaleLowerCase() == planets.Name.toLowerCase()) {
                    planet_data_mono.innerHTML = `${planets.Distance} <span class="planet-data--unit">millions km</span>`;
                }
            });
        });
    });
}
buttons_exp.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        let btn_data = button.getAttribute("data-type");
        let clicked_planet = exp_planet.getAttribute('data-planet');
        let measure = " ";
        if (btn_data == "Distance") {
            measure = "km";
        } else if (btn_data == "Diameter") {
            measure = "km";
        } else if (btn_data == "Mass") {
            measure = "x10<sup>24</sup> kg";
        } else if (btn_data == "Rotation_Period") {
            measure = "hours";
        } else if (btn_data == "Gravity") {
            measure = "m/s²";
        } else if (btn_data == "Mean_Temperature") {
            measure = "°C";
        } else if (btn_data == "Number_of_satellites") {
            measure = "satellites";
        }
        let planet_filter = planetdata.filter((planets) => {
            return planets.Name.toLowerCase().includes(clicked_planet.toLocaleLowerCase());
        });
        planet_filter.forEach(planets => {
            if (previous_data == btn_data) {
                planet_title.innerHTML = `${planets.Name}`;
                planet_infos.innerHTML = `${planets.Informations}`;
                previous_data = "Name";
                btns_icon.forEach(btn_icon => {
                    if(btn_icon.getAttribute("data-type") == btn_data){
                        btn_icon.classList.remove("btn-data--active");
                    }
                });
            } else {
                planet_title.innerHTML = `${planets[btn_data]} <span class="planet-data--unit">${measure}</span>`;
                planet_infos.innerHTML = `${planets['Facts'][0][btn_data]}`;
                btns_icon.forEach(btn_icon => {
                    let btn_icon_data = btn_icon.getAttribute("data-type");
                    if(btn_icon.getAttribute("data-type") == btn_data){
                        btn_icon.classList.add("btn-data--active");
                    }else{
                        btn_icon.classList.remove("btn-data--active");
                    }
                });
                previous_data = btn_data;
            }
        });
    });
});
buttons_all.forEach(button => {
    button.addEventListener('click', (event) => {
        planet_data.forEach(planet_data_mono => {
            planet_data_mono.classList.remove("hidden");
        });
        let btn_data = button.getAttribute("data-type");
        let measure = " ";
        if (btn_data == "Distance") {
            measure = "km";
        } else if (btn_data == "Diameter") {
            measure = "km";
        } else if (btn_data == "Mass") {
            measure = "x10<sup>24</sup> kg";
        } else if (btn_data == "Rotation_Period") {
            measure = "hours";
        } else if (btn_data == "Gravity") {
            measure = "m/s²";
        } else if (btn_data == "Mean_Temperature") {
            measure = "°C";
        } else if (btn_data == "Number_of_satellites") {
            measure = "satellites";
        }
        planet_all_item.forEach(planet_one_item => {
            let solo_planet_data = planet_one_item.getAttribute("data-planet");
            let planet_filter = planetdata.filter((planets) => {
                return planets.Name.toLowerCase().includes(solo_planet_data.toLocaleLowerCase());
            })
            planet_filter.forEach(planets => {
                planet_data.forEach(planet_data_mono => {
                    let current_planet_data = planet_data_mono.getAttribute("data-planet");
                    if (current_planet_data.toLocaleLowerCase() == planets.Name.toLowerCase()) {
                        if (previous_data == btn_data) {
                            planet_data.forEach(planet_data_mono => {
                                planet_data_mono.classList.add("hidden");
                                btns_icon.forEach(btn_icon => {
                                    if(btn_icon.getAttribute("data-type") == btn_data){
                                        btn_icon.classList.remove("btn-data--active");
                                    }                                
                                });
                            });
                            check = true;
                            previous_data = "None";
                        } else if (previous_data != btn_data && check != true) {
                            planet_data_mono.innerHTML = `${planets[btn_data]} <span class="planet-data--unit">${measure}</span>`;
                            btns_icon.forEach(btn_icon => {
                                if(btn_icon.getAttribute("data-type") == btn_data){
                                    btn_icon.classList.add("btn-data--active");
                                }else{
                                    btn_icon.classList.remove("btn-data--active");
                                }
                            });
                            if (current_planet_data == "Neptune") {
                                previous_data = btn_data;
                            }
                        } else if (check == true && current_planet_data == "Neptune") {
                            check = false;
                        }
                    }
                });
            });
        });
    });
});
buttons_filter.forEach(button_filter => {
    button_filter.addEventListener('click', (e) => {
        let button_filter_data = button_filter.getAttribute("data-planet");
        planet_all_item.forEach(planet_item => {
            let planet_item_data = planet_item.getAttribute("data-planet");
            if (filter_index > 0) {
                console.log("1");
                if (button_filter_data == planet_item_data) {
                    if (button_filter.classList.contains("btn--filter-active")) {
                        if (button_filter_data == "Neptune" && filter_index == 1) {
                            buttons_filter.forEach(button => {
                                button.classList.add("btn--filter-active");
                            });
                            planet_all_item.forEach(planet_item => {
                                planet_item.classList.remove("hidden");
                            });
                            filter_index--;
                            previous_filter_index = 0;
                        } else {
                            planet_item.classList.add("hidden");
                            button_filter.classList.remove("btn--filter-active");
                            previous_filter_index = filter_index;
                            filter_index--;
                        }
                    } else {
                        planet_item.classList.remove("hidden")
                        button_filter.classList.add("btn--filter-active")
                        previous_filter_index = filter_index;
                        filter_index++;
                    }
                }
            } else if (filter_index == 0 && previous_filter_index > filter_index) {
                console.log("2");
                check = true;
                buttons_filter.forEach(button => {
                    button.classList.add("btn--filter-active");
                });
                planet_all_item.forEach(planet_item => {
                    planet_item.classList.remove("hidden");
                });
                if (planet_item_data == "Neptune") {
                    previous_filter_index = -1;
                    check = false;
                }
            } else if (filter_index == 0 && check == false) {
                console.log("3");
                previous_filter_index = 0;
                if (planet_item_data == "Neptune") {
                    previous_filter_index = filter_index;
                    filter_index++;
                }
                if (button_filter_data != planet_item_data) {
                    planet_item.classList.add("hidden");
                }
                buttons_filter.forEach(button => {
                    button.classList.remove("btn--filter-active");
                    button_filter.classList.add("btn--filter-active");
                });
            }
        });
    });
});
var menu = ['M', 'V', 'E', 'M', 'J', 'S', 'U', 'N'];
let swiper_container = document.querySelector(".swiper-container");
if (swiper_container) {
    var mySwiper = new Swiper('.swiper-container', {
        breakpoints: {
            1280: {
                direction: 'vertical',
            }
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
    })
    mySwiper.on('activeIndexChange', function() {
        let slide_active = document.querySelector(".swiper-slide-active");
        let slide_active_data = slide_active.getAttribute("data-swiper-slide-index");
        if (mySwiper.activeIndex == "8" | mySwiper.activeIndex == "16") {
            exp_planet.setAttribute("data-planet", "Mercury");
        } else if (mySwiper.activeIndex == "9") {
            exp_planet.setAttribute("data-planet", "Venus");
        } else if (mySwiper.activeIndex == "10") {
            exp_planet.setAttribute("data-planet", "Earth");
        } else if (mySwiper.activeIndex == "11") {
            exp_planet.setAttribute("data-planet", "Mars");
        } else if (mySwiper.activeIndex == "12") {
            exp_planet.setAttribute("data-planet", "Jupiter");
        } else if (mySwiper.activeIndex == "13") {
            exp_planet.setAttribute("data-planet", "Saturn");
        } else if (mySwiper.activeIndex == "14") {
            exp_planet.setAttribute("data-planet", "Uranus");
        } else if (mySwiper.activeIndex == "15" | mySwiper.activeIndex == "7") {
            exp_planet.setAttribute("data-planet", "Neptune");
        }
        let clicked_planet = exp_planet.getAttribute('data-planet');
        let planet_filter = planetdata.filter((planets) => {
            return planets.Name.toLowerCase().includes(clicked_planet.toLocaleLowerCase());
        })
        planet_filter.forEach(planets => {
            if (previous_data == "Name") {
                planet_title.innerHTML = `${planets.Name}`;
                planet_infos.innerHTML = `${planets.Informations}`;
            } else {
                let measure = " ";
                if (previous_data == "Distance") {
                    measure = "km";
                } else if (previous_data == "Diameter") {
                    measure = "km";
                } else if (previous_data == "Mass") {
                    measure = "x10<sup>24</sup> kg";
                } else if (previous_data == "Rotation_Period") {
                    measure = "hours";
                } else if (previous_data == "Gravity") {
                    measure = "m/s²";
                } else if (previous_data == "Mean_Temperature") {
                    measure = "°C";
                } else if (previous_data == "Number_of_satellites") {
                    measure = "satellites";
                }
                planet_title.innerHTML = `${planets[previous_data]} <span class="planet-data--unit">${measure}</span>`;
                planet_infos.innerHTML = `${planets['Facts'][0][previous_data]}`
            }
        });
    });
    window.addEventListener("resize", reportWindowSize);

    function reportWindowSize() {
        if (window.matchMedia("(min-width: 1020px)").matches) {
            mySwiper.mousewheel.enable();
        } else {
            mySwiper.mousewheel.disable();
        }
    }
    reportWindowSize();
}
new kursor({
    type: 4,
    removeDefaultCursor: true,
    color: '#ffffff'
});

// view all drag scroll


const slider_all = document.querySelector('.planet-all');

if(slider_all){
    let isDown = false;
    let startX;
    let scrollLeft;

    slider_all.addEventListener('mousedown', (e) => {
    isDown = true;
    slider_all.classList.add('active');
    startX = e.pageX - slider_all.offsetLeft;
    scrollLeft = slider_all.scrollLeft;
    });
    slider_all.addEventListener('mouseleave', () => {
    isDown = false;
    slider_all.classList.remove('active');
    });
    slider_all.addEventListener('mouseup', () => {
    isDown = false;
    slider_all.classList.remove('active');
    });
    slider_all.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider_all.offsetLeft;
    const walk = (x - startX) * 2; //scroll speed
    slider_all.scrollLeft = scrollLeft - walk;
    console.log(walk);
    });
    
}
