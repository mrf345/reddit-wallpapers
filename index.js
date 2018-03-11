import {
    Choice,
    CheckImg
} from './core'
import $ from 'jquery'

export default function redditWallpapers (options={}) {
    const self = {
        categories: [
            'EarthPorn', 'SpacePorn', 'Wallpapers', 'ExposurePorn',
            'SkyPorn', 'FractalPorn', 'ImaginaryTechnology',
            'BridgePorn', 'wallpapers'
        ],
        data: [],
        loops: [],
        index: 0,
        previousChoice: undefined
    }

    self.options = { // default options, if not provided
        id: options.id || '.reddit', // id or css class of element to wallpaper to
        category: options.category || self.categories, // Array of categories to choose from randomly
        duration: options.duration * 1000 || 30000, // duration of 30 seconds
        aDuration: options.aDuration * 1000 || 500, // transsition animation duration
        limit: options.limit || 30, // limit of json items
        timeout: options.timeout * 1000 || 5000, // request timeout in seconds
        overlay: options.overlay || 'rgba(0,0,0,0.7)', // black transparnt overlay color
        isOverlayed: options.isOverlayed || 'true', // to add overlay to the wallpaper
        isFixed: options.isFixed || 'false', // to set wallpaper to fixed position
        isMixed: options.isMixed || 'false', // to make sure wallpapers selected from mixed categories
        isAnimated: options.isAnimated || 'true' // to use jQuery animation
    }

    function __init__ () {
        // To setup and initiate settings
        let currentChoice = self.previousChoice && self.isMixed === 'false' ? self.previousChoice : Choice(self.options.category)
        let link = 'https://www.reddit.com/r/' + currentChoice + '.json?limit=' + self.options.limit
        console.log(link)
        new Promise((resolve, reject) => {
            fetch(link).then((resp) => {
                setTimeout(() => reject(
                    new Error('reddit request tool too long, timed out')
                ), self.options.timeout)
                return resp.json()
            }).then((json) => resolve(json)).catch((err) => console.warn(err))
        }).then((d) => {
            self.data = d.data.children
            self.loops.push(
                setInterval(setImage, self.options.duration)
            )
            setImage()
        }).catch((err) => console.warn(err))
    }

    function setImage() {
        self.index += 1
        if (self.index >= self.data.length - 1) {
            self.restart() // clearing loops and reinit
        } else {
            let image = self.data[self.index].data.url
            console.log(image)
            CheckImg(image).then(() => {
                $(self.options.id).stop().animate(
                    self.options.isAnimated === 'true' ? {opacity: 0.3} : {opacity: 1},
                    self.options.aDuration,
                    function () {
                        let style = {
                            'width': '100%',
                            'background-size': 'cover',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center'
                        }
                        style['background-image'] = self.options.isOverlayed === 'true' ? 'linear-gradient(' + self.options.overlay + ',' + self.options.overlay + '), url(' + image + ')' : 'url(' + image + ')'
                        if (self.options.isFixed === 'true') style['background-attachment'] = 'fixed'
                        $(this).css(style).animate(
                            {opacity: 1},
                            {duration: self.options.aDuration}
                        )
                    }
                )
            }).catch((err) => {
                self.index += 1
            })
        }
    }

    self.next = () => {
        // to set the next wallpaper
        self.index += 1
        setImage()
    }

    self.previous = () => {
        // to set the previous wallpaper
        self.index -= 2
        setImage()
    }

    self.stop = () => {
        // to stop looping through wallpapers
        self.loops.forEach((l) => clearInterval(l))
    }

    self.restart = () => {
        // to update the que of wallpapers and restart looping through wallpapers
        self.index = 0
        self.data = []
        self.loops.forEach((l) => clearInterval(l))
        self.loops = []
        __init__()
    }

    __init__()
    return self
}
