# reddit-wallpapers (beta)

#### Script to help in fetching wallpapers from [Reddit API][023ff2ff] and loop setting them.

  [023ff2ff]:
  https://www.reddit.com/dev/api/
  "Reddit API documentation"

## [Live Demo][0416ca12]

  [0416ca12]: https://mrf345.github.io/reddit-wallpapers/ "Live demo"


## Install:

#### NPM: to bundle it however you like:
- To install it:
`npm i reddit-wallpapers --save`
- To import it:
```javascript
// ES5
const RedditWallpapers = require('reddit-wallpapers').default

// ES6
import RedditWallpapers from 'reddit-wallpapers'
```

#### Browser:
- You can get the latest bundle from [here](https://mrf345.github.io/reddit-wallpapers/dist/RedditWallpapers.min.js)
- Example:
```html
<head>
  <script src="https://mrf345.github.io/reddit-wallpapers/dist/RedditWallpapers.min.js"></script>
  <script type='text/javascript'>
    var options = {id: '.toChange'}
    var WManager = RedditWallpapers(options)
  </script>
</head>
<body>
  <div class='.toChange'>
    <h1>Reddit Wallpapers !</h1>
  </div>
</body>
```

## Options:

```javascript
self.options = { // default options, if not provided
    id: options.id || '.reddit', // id or css class of element to wallpaper to
    category: options.category || self.categories, // Array of categories to choose from randomly
    duration: options.duration || 10000, // duration of 5 seconds
    aDuration: options.aDuration * 1000 || 1000, // transsition animation duration
    limit: options.limit || 30, // limit of json items
    timeout: options.timeout * 1000 || 5000, // request timeout in seconds
    overlay: options.overlay || 'rgba(0,0,0,0.7)', // black transparnt overlay color
    isOverlayed: options.isOverlayed || 'true', // to add overlay to the wallpaper
    isFixed: options.isFixed || 'false', // to set wallpaper to fixed position
    isMixed: options.isMixed || 'false', // to make sure wallpapers selected from mixed categories
    isAnimated: options.isAnimated || 'true' // to use jQuery animation
}
```

## Support:
Should work with anything newer than `Internet Explorer 10` and `NodeJS 10`.

## Interface:

Function | Describtion
---------|----------------
 `WManager.next()` | set the next wallpaper
 `WManager.previous()` | set the previous wallpaper
 `WManager.stop()` | stop loop setting wallpapers
 `WManager.restart()` | reset settings to default and restart intervals
