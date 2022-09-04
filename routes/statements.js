const express = require('express');
const router = express.Router();
const { getStatements, addStatements, deleteStatements, getTotal } = require('../controllers/statements');

router.route('/').get(getStatements).post(addStatements);
router.route('/:date').get(getStatements);
router.route('/:id').delete(deleteStatements);
router.route('/getTotal/all').get(getTotal);

module.exports = router;