/**
 * Pick randomly from an Array.
 * @param {array} list array of items to pick from.
 */
export function choice(list) {
    let powerOfLength = Math.floor(list.length / 10)
    if (powerOfLength <= 0) powerOfLength = 1

    return list[Math.floor(Math.random() * (10 * powerOfLength))] || list[0]
}


/**
 * Check if image is valid and loadable.
 * @param {string} url image src link.
 * @param {boolean} checkDim check diminutions.
 */
export function checkImg(url, checkDim=false) {
    return new Promise((resolve, reject) => {
        let types = ['png', 'jpg', 'gif']
        let pass = false 

        types = types.concat(types, types.map((t) => t.toUpperCase()))
        for (let i in types) {
            if (url.endsWith('.' + types[i]) || url.indexOf('.' + types[i]) !== -1) pass = true
        }
        if (!pass) reject('Error: wrong link ' + link)
        let img = new Image
        img.onload = (e) => {
            if (checkDim === 'true' && screen.height > img.height || screen.width > img.width) reject(e)
            else resolve(url)
        }
        img.onerror = reject
        img.src = url
    })
}
