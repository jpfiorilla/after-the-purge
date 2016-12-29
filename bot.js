const imdb = require('imdb-api');
const webshot = require('webshot');
const request = require('request-promise');
const fs = require('fs');

// const Twit = require('twit');
const T = require('./t');

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
                width: 660,
                height: 450
            }
        };
        webshot(newBody, 'image.png', options, function(err) {
            console.log('screenshot now saved to image.png');
            tweet();
        });
    }
    })
})

const tweet = function(){
    var b64content = fs.readFileSync('./image.png', { encoding: 'base64' });
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText = "alttext";
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
        console.log('1', data)
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            console.log('2', err)
            if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: '', media_ids: [mediaIdStr] }
            
            T.post('statuses/update', params, function (err, data, response) {
                console.log(data)
                })
            }
        })
    })
}