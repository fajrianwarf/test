const router = require('express').Router();
const { index, getOne, addOne, updateOne, deleteOne } = require('../controller')

router.get('/', index);
router.get('/:id', getOne);
router.post('/', addOne);
router.patch('/:id', updateOne);
router.delete('/:id', deleteOne);

module.exports = router;