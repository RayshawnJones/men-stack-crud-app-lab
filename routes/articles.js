const express = require('express');
const app = express();
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('In articles/new')
});

router.post('/', (req, res) => {
});

module.exports = router;
