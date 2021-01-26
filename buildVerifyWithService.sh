#!/bin/bash

browserify main-browser-with-key-service.js -o build/main-browser-with-key-service.js
browserify -p tinyify main-browser.js -o build/main-browser-bundle.min.js
