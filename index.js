const urls = require('./RESULT/links');
const helpers = require('./helpers/helpers');
const axios = require('axios');
const cheerio = require('cheerio');


axios(urls.links[0])
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.models-grid', html).each(function() {
        $(this).find('a').each(function() {

            const href = $(this).attr('href');
            const name = $(this).text();

        })
    })
})
.catch(err => console.log(err));