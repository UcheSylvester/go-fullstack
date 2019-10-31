const express = require('express')
const router = express.Router()

const stuffController = require('../controllers/stuff')

// Getting all things from the database
router.get('/', stuffController.getAllThings)

// posting things to the database
router.post('/', stuffController.createThing)

// Getting a single thing from the database based on the id
router.get('/:id', stuffController.getOneThing)

// Updating a single thing in the database based on the id
router.put('/:id', stuffController.modifyThing)

// Deleting a single thing based on the id
router.delete('/:id', stuffController.deleteThing)




module.exports = router;