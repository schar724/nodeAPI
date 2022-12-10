const path = require('path')
const express = require('express')
const app = express()


const artHandler = require('./scripts/router.js')

artHandler.handleAllArtists(app)
artHandler.handleArtistByCountry(app)
artHandler.handleAllGalleries(app)
artHandler.handleGalleriesByCountry(app)
artHandler.handleAllPaintings(app)
artHandler.handlePaintingsById(app)
artHandler.handlePaintingsByGalleryId(app)
artHandler.handlePaintingsByArtistId(app)
artHandler.handlePaintingsByYear(app)
artHandler.handlePaintingsByTitle(app)
artHandler.handlePaintingsByColorName(app)

app.use( (req, res) => {
    res.status(404).send('404: Page not found')
});

const port = 8080
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});