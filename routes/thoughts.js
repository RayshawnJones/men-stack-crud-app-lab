const express = require('express');
const Thought= require('./../models/thought');
const router = express.Router();
const app = express();


router.get('/new', (req, res) => {
    res.render('thoughts/new', {thought: new Thought()})
});

router.get('/edit/:id', async (req, res) => {
    const thought = await Thought.findById(req.params.id)
    res.render('thoughts/edit', {thought: new thought()})
});
router.get('/slug', async (req, res) => {
    const thought = await Thought.findOne({ slug: req.params.slug});
    if (thought == null) res.redirect('/')
    res.render('thoughts/show', {thought: thought})
});

router.post('/', async (req, res, next) => {
    req.thought = new Thought()
    next()
}, savethoughtAndRedirect('new'));

router.put('/', async (req, res, next) => {
    req.thought = await Thought.findOneById(req.params.id)
    next()
}, savethoughtAndRedirect('edit'));
    
router.delete('/:id', async (req, res) => {
    await Thought.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


function savethoughtAndRedirect(path) {
    return async (req, res) => {
        let thought = req.thought
        thought.title = req.body.title
        thought.title = req.body.title
        thought.markdown = req.body.markdown
try {
    thought = await thought.save()
    res.redirect(`/thoughts/${thought.slug}`)
} catch (e) {
        res.render(`thoughts/${path}`,{thought:thought}        
        )
    }
}
}

module.exports = router;
