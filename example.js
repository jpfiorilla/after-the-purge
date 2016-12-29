/*
example.js
 
this electron script will screen-capture the webpage http://electron.atom.io
 
instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite && \
            printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' > \
            package.json && \
            ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging
    3. view screencapture ./screen-capture.testExampleJs.browser.png
*/
 
/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    stupid: true
*/

// "just before the city's annual purge, when all crime is legal."
 
const getPic = function (url) {
    'use strict';
    var options, modeNext, onNext;
    modeNext = 0;
    onNext = function (data) {
        modeNext += 1;
        switch (modeNext) {
        case 1:
            // wait for electron to init 
            require('electron').app.once('ready', onNext);
            break;
        case 2:
            // init options 
            options = { frame: false, height: 768, width: 1024, x: 0, y: 0 };
            // init browserWindow; 
            options.BrowserWindow = require('electron').BrowserWindow;
            options.browserWindow = new options.BrowserWindow(options);
            // goto next step when webpage is loaded 
            options.browserWindow.webContents.once('did-stop-loading', onNext);
            // open url 
            // options.browserWindow.loadURL('http://electron.atom.io');
            options.browserWindow.loadURL(url);
            break;
        case 3:
            // screen-capture webpage 
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // save screen-capture 
            require('fs').writeFileSync(
                'screen-capture.testExampleJs.browser.png',
                data.toPng()
            );
            // exit 
            process.exit(0);
            break;
        }
    };
    onNext();
};

const imdb = require('imdb-api');
imdb.getById('tt0496424').then(things => {
    console.log(things);
    getPic(things.imdburl);
});
// imdb.getReq({ id: '0496424' }, (err, things) => {
//     console.log(things)
//     const url = things.imdburl;
// });