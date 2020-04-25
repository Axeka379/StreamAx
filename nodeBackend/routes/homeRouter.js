'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/homeController')
const jwtHandler = require('../authorization/jwtHandler')

// Routes for home
router.route('/')
  .get(jwtHandler.jwtAuth, controller.getStart)
  .post(controller.loginPost)
  
module.exports = router
