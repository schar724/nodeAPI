const path = require('path')
const fs = require('fs')

const jsonPath = path.join(__dirname, '../data', 'paintings-nested.json')

let paintings;
getPaintingsData(jsonPath);

async function getPaintingsData(jsonPath) {
    try{
        const data = await fs.readFileSync(jsonPath, 'utf-8')
        paintings = JSON.parse(data)
    } catch (err) {
        console.log('Error reading ', jsonPath)
    }
}

function getData() {
    return paintings;
}

module.exports = { getData }