let express = require('express'),
	router  = express.Router()
	IndexController = require('./../controllers/IndexController'),
	indexController = new IndexController()

router.get('/', indexController.index.bind(indexController))

module.exports = router
