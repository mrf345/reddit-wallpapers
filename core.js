// Core functions

const Choice = (list) => {
    // to choose randomly from an Array
    let powerOfLength = Math.floor(list.length / 10)
    if (powerOfLength <= 0) powerOfLength = 1
    let toreturn = list[Math.floor(Math.random() * (10 * powerOfLength))]
    return toreturn ? toreturn : list[0]
}

const CheckImg = (url) => {
    // Promise function to check if image is valid and loadable
    return new Promise((resolve, reject) => {
        let img = new Image
        img.onload = (e) => {
            resolve(e)
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