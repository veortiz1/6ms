const express = require('express');
const router = express.Router();



const bcrypt = require('bcrypt');
const db = require('../config/db');
const client = require('../config/reddis');
const crypto = require('crypto');



module.exports=router;