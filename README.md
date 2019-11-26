# BundleJS
Simple Script to Compile JS Files on a HTML page. Will search a specified HTML page and download a compiled JS file of all scripts on that page. Meant to bundle files before minifying.

### How to use
Download the `bundle.js` file and add the following `script` tag on one of your HTML pages:
```html
<script src="bundle.js" data-source="index.html"></script>
```
replacing `index.html` with the HTML page you want the script to search for scripts on to compile.

To prevent a JavaScript file from being included in the output, add the following comment to the file you want to exclude:
```javascript
// INCLUDE == FALSE
```
