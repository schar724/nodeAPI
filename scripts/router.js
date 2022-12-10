const artistsProvider = require('./artistsProvider.js')
const galleryProvider = require('./galleriesProvider.js')
const paintingsProvider = require('./paintingsProvider.js')

const handleAllPaintings = app => {
    app.get('/api/paintings', (req, res) => {
        res.json(paintingsProvider.getData())
    })
}

const handlePaintingsById = app => {
    app.get('/api/painting/:id', (req, res) => {
        const id = req.params.id
        const paintingsList =  paintingsProvider.getData()
        const paintingById = paintingsList.filter(painting => painting.paintingID == id)
        
        if(paintingById.length > 0) {
            res.json(paintingById)
        } else {
            res.json(`ID: ${id} not found`)
        }
    })
}

const handlePaintingsByGalleryId = app => {
    app.get('/api/painting/gallery/:id', (req, res) => {
        const id = req.params.id
        const paintingsList =  paintingsProvider.getData()
        const paintingById = paintingsList.filter(painting => painting.gallery.galleryID == id)

        if(paintingById.length > 0) {
            res.json(paintingById)
        } else {
            res.json(`Gallery ${id} not found`)
        }
    })
}

const handlePaintingsByArtistId = app => {
    app.get('/api/painting/artist/:id', (req, res) => {
        const id = req.params.id
        const paintingsList =  paintingsProvider.getData()
        const paintingById = paintingsList.filter(painting => painting.artist.artistID == id)

        if(paintingById.length > 0) {
            res.json(paintingById)
        } else {
            res.json(`Artist ${id} not found`)
        }
    })
}

const handlePaintingsByYear = app => {
    app.get('/api/painting/year/:min/:max', (req, res) => {
        const min = req.params.min
        const max = req.params.max

        if(min > max) 
            res.json('Invalid year range')

        const paintingsList =  paintingsProvider.getData()
        const paintingByYear = paintingsList.filter(painting => min <= painting.yearOfWork && painting.yearOfWork <= max)

        if(paintingByYear.length > 0) {
            res.json(paintingByYear)
        } else {
            res.json(`No paintings from ${min} to ${max} found`)
        }
    })
};

const handlePaintingsByTitle = app => {
    app.get('/api/painting/title/:text', (req, res) => {
        const text = req.params.text.toLowerCase()
        const paintingsList =  paintingsProvider.getData()
        const paintingByTitle = paintingsList.filter(painting => painting.title.toLowerCase().includes(text))

        if(paintingByTitle.length > 0) {
            res.json(paintingByTitle)
        } else {
            res.json(`No paintings with title ${text} found`)
        }
    })
};

const handlePaintingsByColorName = app => {
    app.get('/api/painting/color/:name', (req, res) => {
        const name = req.params.name.toLowerCase()
        const paintingsList =  paintingsProvider.getData()
        const paintingByColor = []

        for(let painting of paintingsList) {
            for(let color of painting.details.annotation.dominantColors) {
                if(color.name.toLowerCase() === name) {
                    paintingByColor.push(painting)
                }
            }
        }

        if(paintingByColor.length > 0) {
            res.json(paintingByColor)
        } else {
            res.json(`No paintings with color ${name} found`)
        }
    })
}; 

const handleAllGalleries = app => {
    app.get('/api/galleries', (req, res) => {
        res.json(galleryProvider.getData())
    })
}

const handleGalleriesByCountry = app => {
    app.get('/api/galleries/:country', (req, res) => {
        const country = capitalize(req.params.country)
        const galleryList =  galleryProvider.getData()
        const galleriesByCountry = galleryList.filter(gallery => gallery.GalleryCountry === country)
        
        if(galleriesByCountry.length > 0) {
            res.json(galleriesByCountry)
        } else {
            res.json(`${country} not found`)
        }
    })
}

const handleAllArtists = app => {
    app.get('/api/artists', (req, res) => {
        res.json(artistsProvider.getData())
    })
}

const handleArtistByCountry = app => {
    app.get('/api/artists/:country', (req, res) => {
        const country = capitalize(req.params.country)
        const artistsList =  artistsProvider.getData()
        const artistsByCountry = artistsList.filter(artist => artist.Nationality === country)
        
        if(artistsByCountry.length > 0) {
            res.json(artistsByCountry)
        } else {
            res.json(`${country} not found`)
        }
    })
}

function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}


module.exports = { handleAllArtists, handleArtistByCountry, handleAllGalleries, handleGalleriesByCountry, handleAllPaintings, handlePaintingsById, handlePaintingsByGalleryId, handlePaintingsByArtistId, handlePaintingsByYear, handlePaintingsByTitle, handlePaintingsByColorName }