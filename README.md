# Character Sheet. 5e.

A responsive, online/offline web app to act as a character sheet for 5e D&D.

## Synopsis

If you just want to use the app, I am running a copy of it here: [https://charsheet5e.derikbadman.com] Try it out. Check out the "Help" link in the footer for some instructions.

If you want to run the app on your own server, assist in development, or fork your own, continue on...

## Motivation

I hate fillable pdfs. I couldn't find a sharp pencil for the character sheet I printed out. I wanted to use my new iPad. I wanted to try out a bunch of modern browser features without worrying about backwards compatibility. I thought maybe someone else would want these things too.

## Installation

### Serverless

Just open up index.html in a browser.

### Server

Point your server at the repo so it opens index.html. If you want to take advantage of the offline mode then you'll need to use a HTTPS connection.

## Tests

No tests yet, as I am not sure how to best go about that.

## Contributors

I'd be happy to accept feature requests, bug reports, and pull requests via the github repository. There is an eslint config file for javascript style, which can be run on the code via ```npm run eslint:js``` Run ```npm run build``` to concat/uglify the source files.

## License

GNU GENERAL PUBLIC LICENSE, Version 3