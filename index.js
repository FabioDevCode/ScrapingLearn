const urls = require('./RESULT/links');
const helpers = require('./helpers/helpers');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const dataLus = require('./data');

axios(urls.links[0]) // Call AXIOS // --------------------
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.models-grid', html).each(function() {
        $(this).find('a').each(function() {

            // Model object
            const new_obj = {}
            new_obj.model_name = helpers.getModel($(this).text());
            new_obj.year = [];
            // dataLus[helpers.getName(urls.links[0])].push(new_obj);

            const href = $(this).attr('href');

            axios(href) // Call AXIOS // --------------------
            .then(response2 => {
                const html2 = response2.data;
                const $ = cheerio.load(html2);

                // console.log(new_obj)

                $('.buttons-grid').find('a').each(function() {
                    // Year object
                    const yr_obj = {}
                    const href2 = helpers.splitUrl($(this).attr('href'));
                    const link2 = $(this).attr('href');

                    console.log(link2);

                    yr_obj.year_name = href2[0];
                    yr_obj.fuel = [];

                    // Fuel object
                    const fl_obj = {}
                    fl_obj.fuel_name = href2[1];
                    fl_obj.motor = []

                    if(href2.length > 1) {
                        if(new_obj.year.length) {
                            if((new_obj.year[0].fuel && new_obj.year[0].fuel.fuel_name != href2[1]) || (new_obj.year[0].fuel && new_obj.year[1].fuel && new_obj.year[0].fuel.fuel_name != href2[1] && new_obj.year[1].fuel.fuel_name != href2[1])) {
                                yr_obj.fuel.push(fl_obj);
                            }
                        } else {
                            yr_obj.fuel.push(fl_obj);
                        }
                    } else {
                        // Faire un call avec axios
                        // si href.length == 1
                        // afin de définier fuel pour
                        // chaque year
                    }


                    if(new_obj.year.find(el => el.year_name === href2[0]) == undefined) {
                        new_obj.year.push(yr_obj)
                    }
                });

                // console.log(new_obj.year[0]);
            })
            .catch(err => {throw err})

            // fs.writeFile("data2.json", JSON.stringify(dataLus), err => {
            //     if(err) {
            //         throw err
            //     };
            //     console.log("Data writing");
            // })
        })
    })
})
.catch(err => console.log(err));