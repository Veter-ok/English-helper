const { Router } = require('express');
const router = new Router();
const userConstroller = require('../controllers/userConstroller')
const vacabularyConstroller = require('../controllers/vacabularyController')

router.post('/user/login', userConstroller.login)
router.post('/user/reg', userConstroller.registration)
router.post('/user/edit_user', userConstroller.edit)
router.post('/user/auth', userConstroller.check)
router.post('/vacabulary/search', vacabularyConstroller.search_word)
router.post('/vacabulary/add', vacabularyConstroller.add_word)

module.exports = router