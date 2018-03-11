# reddit-wallpapers (beta)

### Script to help in fetching wallpapers from [Reddit API][023ff2ff] and loop setting them 

  [023ff2ff]:
  https://www.reddit.com/dev/api/
  "Reddit API documentation"

## [Live Demo][0416ca12]

  [0416ca12]: https://audio-sequence.github.io/reddit.html "Live demo of reddit-wallpapers"



## Setup:

```html
<head>
  <script src='bundle.js' type='text/javascript'></script>
  <script type='text/javascript'>
    var WManager = redditWallpapers({
      id: '.toChange'
    })
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

## Functions:

#### To use any of the following functions, you have to get an instance of the constructor, which we did in the Setup section :
` var WManager = redditWallpapers()` </br>
` WManager.following_functions()`


Function | Describtion
---------|----------------
 next() | set the next wallpaper
 previous() | set the previous wallpaper
 stop() | stop loop setting wallpapers
 restart() | reset settings to default and restart looping


## Dependencies:
> - jQuery

