let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let scraper = require('./scrapers');

let urlencodedParser = bodyParser.urlencoded({extended: false});
let comment= [];
router.get('/', function(req, res){
    res.render('index', {comment: comment});
});

router.post('/', urlencodedParser, async function(req, res){
    console.log(req.body);
    comment = await scraper.scrapeProduct(req.body['URL'], Number(req.body['count']));
    //console.log(comment);
    res.render('index', {comment: comment});
});

module.exports = router;