import jQuery from 'jquery'
import { JSDOM } from 'jsdom'

import { choice, checkImg } from './utils'

global.$ = jQuery

if (JSDOM) {
    global.window = new JSDOM().window
    global.document = global.window.document
    global.window = document.defaultView
    global.navigator = window.navigator
    global.localStorage = {}
    global.$ = jQuery(window)
}


export function redditWallpapers (options={}) {
    const self = {
        categories: [
            'EarthPorn', 'SpacePorn', 'Wallpapers', 'ExposurePorn',
            'SkyPorn', 'FractalPorn', 'ImaginaryTechnology',
            'BridgePorn', 'wallpapers', 'skylineporn', 'CityPorn'
        ],
        data: [],
        loops: [],
        index: parseInt(localStorage.redWallIndex) - 1 || 0,
        previousChoice: undefined,
        lastCallFailed: false
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


    /**
     * Set image as a background.
     * @param {string} src image link.
     */
    function setImage(src) {
        src = src || self.data[self.index].data.url

        let style = {
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'width': '100%',
            'background-image': self.options.isOverlayed === 'true'
                ? `linear-gradient(${self.options.overlay},${self.options.overlay}), url(${src})`
                : `url(${src})`
        }

        if (self.options.isFixed === 'true') style['background-attachment'] = 'fixed'

        $(`${self.options.id}, ${self.options.id_widthless}`)
            .stop()
            .animate(
                {opacity: self.options.isAnimated === 'true' ? 0.3 : 1},
                self.options.aDuration,
                function () {
                    $(this).css(style).animate(
                        {opacity: 1},
                        {duration: self.options.aDuration}
                    )
                }
            )
    }

    /**
     * Setup and initiate intervals
     */
    function main() {
        const currentChoice = self.previousChoice && self.isMixed === 'false'
            ? self.previousChoice
            : choice(self.options.category)
        const link = `https://www.reddit.com/r/${currentChoice}.json?limit=${self.options.limit}`

        if (self.options.defaultImg) setImage(self.options.defaultImg)

        new Promise((resolve, reject) => {
            setTimeout(() => reject(false), self.options.timeout)
            $.get(link)
                .done((json) => resolve(json))
                .fail((err) => reject(false))
        }).then((d) => {
            self.lastCallFailed = false
            self.data = d.data.children
            self.loops.push(setInterval(setNextImage, self.options.duration))
            setNextImage()
        }).catch((err) => {
            if (!self.options.defaultImg) console.warn(err)
            self.lastCallFailed = true
        })
    }

    /**
     * Set the next image.
     */
    function setNextImage() {
        self.index += 1
        localStorage.redWallIndex = self.index

        if (self.index >= self.data.length - 1 && !self.lastCallFailed) self.restart()
        else checkImg(self.data[self.index].data.url, self.options.checkDim)
            .then(setImage)
            .catch(setNextImage)
    }

    /**
     * Set the next wallpaper.
     */
    self.next = () => {
        self.index += 1
        setImage()
    }

    /**
     * Set the previous wallpaper.
     */
    self.previous = () => {
        self.index -= 2
        setImage()
    }

    /**
     * Stop the wallpapers changing interval.
     */
    self.stop = () => {
        self.loops.forEach((l) => clearInterval(l))
    }

    /**
     * Teardown and restart the wallpapers changing interval.
     */
    self.restart = () => {
        self.index = 0
        self.data = []
        self.loops.forEach((l) => clearInterval(l))
        self.loops = []
        main()
    }

    main()
    return self
}
