# Chrome Extension

## Extension Terminology

### Manifest
The only required files that needs to be in the root directory of the extension. Must be named as ```manifest.json```. This defines the resources, permission, and the files that needs to run in the background and on the page.

### Service workers
Runs in the background of the page and handles browser events (such as removing bookmark or closing a tab). Though service workers don't have access to the DOM.

### Content Scripts
Run JavaScript in the context of a web page.

### Toolbar action
Execute a code when the user clicks on the extension toolbar icon or show a popup using the Action API.

### Side Panel
Display custom UI in the browsers side panel

### DeclarativeNetRequest
Intercept, clock, or modify network requests
