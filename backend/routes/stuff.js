const express = require('express')
const router = express.Router()

// protecting routes
const auth = require('../middleware/auth')

// saving images with multer
const multer = require('../middleware/multer-config')

const stuffController = require('../controllers/stuff')

// Getting all things from the database
router.get('/', auth, stuffController.getAllThings)

// posting things to the database
router.post('/', auth, multer, stuffController.createThing)

// Getting a single thing from the database based on the id
router.get('/:id', auth, stuffController.getOneThing)

// Updating a single thing in the database based on the id
router.put('/:id', auth, multer, stuffController.modifyThing)

// Deleting a single thing based on the id
router.delete('/:id', auth, stuffController.deleteThing)




module.exports = router;