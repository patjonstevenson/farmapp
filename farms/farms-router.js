const db = require('./farms-model');
const helpers = require('./farms-helpers');

const router = require('express').Router();
const id_middleware = require('../users/validate-id-middleware');

// router.get('/farms/:farm_id')