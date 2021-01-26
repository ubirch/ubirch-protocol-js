#!/bin/bash

browserify main-browser.js -o build/main-browser-bundle.js
browserify -p tinyify main-browser.js -o build/main-browser-bundle.min.js
