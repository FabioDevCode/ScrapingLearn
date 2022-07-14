const env = require('./env');
const axios = require('axios');
const cheerio = require('cheerio');

axios(env.URL)
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('#car', html).each(function() {
        $(this).find('.brands-grid', html).each(function() {
            const title = $(this).find('a').text();

            $(this).find('a').each(function() {
                const href = $(this).attr('href');
            })
        })
    })
})
.catch(err => console.log(err));