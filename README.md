# Test SSR

Test of SSR (server side renderer) with a VueJS application.

## Key notes

- All calls to the `window` object should be optional (they will only be executed on the front side) ; think carefully to `localStorage`, `encodeURIComponent`, `window.env`, `print`, `Notification`, `cordova`, etc.
- Libraries must be compatible with NodeJS, and not only depend on browser functions (for example, use `axios` instead of `vue-resource`).
- Each component will call the `loadContent` method if it is defined at its creation, and will wait for the promise to be resolved before considering that the page is loaded.
- A `metaInfo` method/object can be defined in the components to set the title, description, additional scripts to load, HTTP return code, etc.

## TODO

- No SSR directive
- Bundle size too huge (minification?)
- Production builds (index.html for static build, chunks, version in filename, server build, ...)
- Hot reload
