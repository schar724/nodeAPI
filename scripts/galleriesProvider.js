const path = require('path')
const fs = require('fs')

const jsonPath = path.join(__dirname, '../data', 'galleries.json')

let galleries;
getGalleriesData(jsonPath);

async function getGalleriesData(jsonPath) {
    try{
        const data = await fs.readFileSync(jsonPath, 'utf-8')
        galleries = JSON.parse(data)
    } catch (err) {
        console.log('Error reading ', jsonPath)
    }
}

function getData() {
    return galleries;
}

module.exports = { getData }