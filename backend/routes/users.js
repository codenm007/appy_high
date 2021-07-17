var express = require('express');
var router = express.Router();

//importing controllers
const {connect_randomly } = require("../controllers/call");

router.post('/connect_call_randomly',connect_randomly );


module.exports = router;
