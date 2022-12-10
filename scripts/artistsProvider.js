const path = require('path')
const fs = require('fs')

const jsonPath = path.join(__dirname, '../data', 'artists.json')

let artists;
getArtistData(jsonPath);

async function getArtistData(jsonPath) {
    try{
        const data = await fs.readFileSync(jsonPath, 'utf-8')
        artists = JSON.parse(data)
    } catch (err) {
        console.log('Error reading ', jsonPath)
    }
}

function getData() {
    return artists;
}

module.exports = { getData }