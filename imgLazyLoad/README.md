# Image Lazy Loading

## Usage

To make this script work with the [generator-web-project](https://github.com/davidpustai/generator-web-project), follow these steps:
1. Make sure `<html>` has the `no-js` class on each page and that your JavaScrtip is removing it.
2. Include the `imgLazyLoad.js` in Gulp build process.
3. If you are not yet using some throttle function, include the extracted underscore throttle (`underscore-throttle.js`) or copy it into `plugins.js`.
4. Initialize the `imgLazyLoad()` function in `main.js`.
5. Import the `_img-lazy-load.scss` in `main.scss`.
6. Edit markup of your images:
```
<img class="img-lazy-load" data-src="..." alt="..." width="..." height="...">
<noscript><img src="..." alt="..." width="..." height="..."></noscript>
```
