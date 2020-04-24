'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/homeController')

// Routes for home
router.route('/')
  .get(controller.getStart)
  .all((req, res, next) => req.method === 'OPTIONS' // catches not supported methods
    ? res.header('Allow', 'GET, OPTIONS').status(200).json({ supportedMethods: 'GET, OPTIONS' })
    : res.header('Allow', 'GET, OPTIONS').status(405).json({ message: 'Method not allowed' }))

module.exports = router
