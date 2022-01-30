# Character Sheet. App.

A responsive, online/offline web app to act as a character sheet for tabletop roleplaying games. Right now supporting a limited number of games (mostly D&amp;D 5e), but coded so more can be added.

## Synopsis

If you just want to use the app, I am running a copy of it here: https://charsheet.derikbadman.com Try it out. Check out the "Help" link in the footer for some instructions.

If you want to run the app on your own server, assist in development, or fork your own, continue on...

## Motivation

I hate fillable pdfs. I couldn't find a sharp pencil for the character sheet I printed out. I wanted to use my new iPad. I wanted to try out a bunch of modern browser features without worrying about backwards compatibility. I thought maybe someone else would want these things too.

## Installation

You'll need a local server running, or to put the code on a remote server.

For remote saving you will have to add your own firebase configs to `./src/config/firebase.js`  and rebuild the app.

## Local Server

**If you aren't doing development**, an easy way to get a server running is via `http-server`. Assuming you have npm installed you can: `npm i -g http-server`. Then from the repository of this app you can run `http-server ./dist/ -a localhost` and you should then be able to see/run the app at `http://localhost:8080` in your browser.

**If you are doing development**, then you you can `npm install` in the repo and `npm run start` to start the esbuild dev server/build. By default that will run the app at `http://localhost:8080`

### Server

* Point your server at the repo so it opens `./dist/index.html`. That's about it...

If you want to take advantage of the offline mode, it's a little more complicated:
* you'll need to use a HTTPS connection (Let's Encrypt is fairly easy to set-up to get a free SSL cert)
* You'll want to set the main server directory to the `dist` directory of the code, that way the server won't serve any of the other files.
* Make sure files are set to not cache (the service worker will handle that). In nginx I added the following to my server block:
```
    index   index.html;
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    location / {
        expires -1;
    }
```


## Tests

No tests yet, as I am not sure how to best go about that.

## Contributors

I'd be happy to accept feature requests (including other games to support), bug reports, and pull requests via the github repository. There is an eslint config file for javascript style, which your IDE should pick up. Run ```npm run start``` to run the dev server and `npm run build` to build the files.

Conventional Changelog is installed for commit messages. Standard Version is used for releases, changelogs, etc.

## License

GNU GENERAL PUBLIC LICENSE, Version 3
