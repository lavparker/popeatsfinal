var national_foods = require('../data/country_food_data.json');


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".button");
    const closeModalBtn = document.querySelector(".btn-close");

    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    };

    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };

    openModalBtn.addEventListener("click", openModal); 
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    const width = 900;
    const height = 600;


    
    const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);


    const projection = d3.geoMercator().scale(140).translate([width / 2, height / 1.4]);
    //set up the path generator 
    const path = d3.geoPath().projection(projection);

    const tooltip = svg.append('g');


    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(data => {
        const countries = topojson.feature(data, data.objects.countries);
       
        svg.selectAll('path')
            .data(countries.features)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path)
            .attr('data-countryname', (d) => d.properties.name)
            .append('title')
            .text(d => ` ${d.properties.name}`);

      

            svg.on('mouseover', (d) => {
                console.log('MOUSEOVER EVENT', d.target?.dataset)
                let hovered_country = getCountryNameFromTarget(d.target?.dataset)

                if (national_foods[selected_country]) {
                    document.getElementsByClassName("country").innerHTML = selected_country 
                }


            })

            // add x to country/food box

            svg.on("click", (d) => {
                let selected_country = getCountryNameFromTarget(d.target)
                // let country_reveal = document.querySelector('country-reveal'); 
                if (national_foods[selected_country]) {
                    document.getElementById("food_displayer").innerHTML = selected_country + ": " + national_foods[selected_country].dish
                    // document.getElementById("country_info_displayr").innerHTML = selected_country + ": " + national_foods[selected_country].dish

                }
            })

       
            //  function dropdownSelection ("click", (d) =>{
            //     let selected_country = getCountryNameFromTarget(d.target)

            //  })
    });

    
    // let food_countries = Object.keys(national_foods); 

    // function

    


  


    function getCountryNameFromTarget(target) {
        if (!target) {
            return ""
        }

        let element = target.querySelector("title")

        if (!element) {
            return ""
        }

        let country_id_and_name = element.innerHTML
        let split_index = country_id_and_name.indexOf(': ') + 2

        let country_name = country_id_and_name.slice(split_index)

        return country_name
    }

})