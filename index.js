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
            'BridgePorn', 'wallpapers', 'skylineporn', 'CityPorn'
        ],
        data: [],
        loops: [],
        index: parseInt(localStorage.redWallIndex) - 1 || 0,
        previousChoice: undefined
    }

    self.options = { // default options, if not provided
        id: options.id || '.reddit', // id or css class of element to wallpaper to
        id_widthless: options.id_widthless || '.reddit_widthless', // id to use with for elements without width modification
        category: options.category || self.categories, // Array of categories to choose from randomly
        duration: options.duration * 1000 || 30000, // duration of 30 seconds
        aDuration: options.aDuration * 1000 || 500, // transsition animation duration
        limit: options.limit || 30, // limit of json items
        timeout: options.timeout * 1000 || 5000, // request timeout in seconds
        overlay: options.overlay || 'rgba(0,0,0,0.7)', // black transparnt overlay color
        isOverlayed: options.isOverlayed || 'true', // to add overlay to the wallpaper
        isFixed: options.isFixed || 'false', // to set wallpaper to fixed position
        isMixed: options.isMixed || 'false', // to make sure wallpapers selected from mixed categories
        isAnimated: options.isAnimated || 'true', // to use jQuery animation
        defaultImg: options.defaultImg || '', // default image to use if failed
        checkDim: options.checkDim || 'true', // make sure img dimensions larger than screen dimensions
    }

    function __init__ () {
        // To setup and initiate settings
        let currentChoice = self.previousChoice && self.isMixed === 'false' ? self.previousChoice : Choice(self.options.category)
        let link = 'https://www.reddit.com/r/' + currentChoice + '.json?limit=' + self.options.limit
        new Promise((resolve, reject) => {
            fetch(link)
            .then((resp) => {
                setTimeout(() => reject(false), self.options.timeout)
                return resp.json()
            })
            .then((json) => resolve(json))
            .catch((err) => reject(false))
        }).then((d) => {
            self.data = d.data.children
            self.loops.push(
                setInterval(setImage, self.options.duration)
            )
            setImage()
        }).catch((err) => self.options.defaultImg === '' ? console.warn(err) : setImage(true))
    }

    function setImage(defaultImage=false) {
        localStorage.redWallIndex = self.index + 1
        self.index += 1
        if (self.index >= self.data.length - 1 && !defaultImage) {
            self.restart() // clearing loops and reinit
        } else {
            let image = defaultImage ? self.options.defaultImg : self.data[self.index].data.url
            CheckImg(image, self.options.checkDim).then(() => {
                let sstyle = {
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center',
                }
                sstyle['background-image'] = self.options.isOverlayed === 'true' ? 'linear-gradient(' + self.options.overlay + ',' + self.options.overlay + '), url(' + image + ')' : 'url(' + image + ')'
                if (self.options.isFixed === 'true') sstyle['background-attachment'] = 'fixed'
                let style = {...sstyle, 'width': '100%'}
                $(self.options.id).stop().animate(
                    self.options.isAnimated === 'true' ? {opacity: 0.3} : {opacity: 1},
                    self.options.aDuration,
                    function () {
                        $(this).css(style).animate(
                            {opacity: 1},
                            {duration: self.options.aDuration}
                        )
                    }
                )
                $(self.options.id_widthless).stop().animate(
                    self.options.isAnimated === 'true' ? {opacity: 0.3} : {opacity: 1},
                    self.options.aDuration,
                    function () {
                        $(this).css(sstyle).animate(
                            {opacity: 1},
                            {duration: self.options.aDuration}
                        )
                    }
                )
            }).catch((err) => {
                setImage()
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
