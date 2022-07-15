const urls = require('./RESULT/links');
const helpers = require('./helpers/helpers');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const dataLus = require('./data');

axios(urls.links[0])
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.models-grid', html).each(function() {
        $(this).find('a').each(function() {

            const new_obj = {}
            new_obj.model_name = helpers.getModel($(this).text());

            dataLus[helpers.getName(urls.links[0])].push(new_obj);

            fs.writeFile("data.json", JSON.stringify(dataLus), err => {
                if(err) {
                    throw err
                };
                console.log("Data writing");
            })

        })
    })
})
.catch(err => console.log(err));