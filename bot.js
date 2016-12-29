const imdb = require('imdb-api');
const webshot = require('webshot');
const request = require('request-promise');



imdb.getById('tt0496424')
    .then(things => {
    // console.log(things);
    return things.imdburl;
})
.then(url => {
    request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const purgetext = " just before the city's annual purge, when all crime is legal.";
        let descriptionDiv = 'class="summary_text" itemprop="description"';
        let preIndex = body.indexOf(descriptionDiv);
        let searchIndex = preIndex + body.substring(preIndex).indexOf('</div>');
        let newBody = body.substring(0, searchIndex-14) + purgetext + body.substring(searchIndex);
        // console.log(newBody.substring(preIndex, searchIndex+purgetext.length+200));
        let options = {
            siteType:'html',
            shotOffset: {
                left: 8,
                right: 0,
                top: 300,
                bottom: 0
            },
            shotSize: {
                width: 680,
                height: 450
            }
        };
        webshot(newBody, 'image.png', options, function(err) {
            console.log('screenshot now saved to image.png');
        });
    }
    })
})
