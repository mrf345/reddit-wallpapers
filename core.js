// Core functions

const Choice = (list) => {
    // to choose randomly from an Array
    let powerOfLength = Math.floor(list.length / 10)
    if (powerOfLength <= 0) powerOfLength = 1
    let toreturn = list[Math.floor(Math.random() * (10 * powerOfLength))]
    return toreturn ? toreturn : list[0]
}

const CheckImg = (url, checkDim=false) => {
    // Promise function to check if image is valid and loadable
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
            else resolve(e)
        }
        img.onerror = (e) => {
            reject(e)
        }
        img.src = url
    })
}

export {
    Choice,
    CheckImg
}