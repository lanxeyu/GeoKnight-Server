const express = require('express');
const cors = require('cors')

const fruits = require('./data.json')
const logger = require('./logger')

const app = express();
