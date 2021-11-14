const { Router } = require('express');
const router = new Router();
const userConstroller = require('../controllers/userConstroller')
const vacabularyConstroller = require('../controllers/vacabularyController')

router.post('/user/login', userConstroller.login)
router.post('/user/reg', userConstroller.registration)
router.post('/user/edit_user', userConstroller.edit)
router.post('/user/auth', userConstroller.check)
router.post('/vocabulary/search', vacabularyConstroller.search_word)
router.post('/vocabulary/add_know', vacabularyConstroller.add_know)
router.post('/vocabulary/add_learn', vacabularyConstroller.add_learn)
router.post('/vocabulary/delete-learn', vacabularyConstroller.delete_learn)
router.post('/vocabulary/delete-know', vacabularyConstroller.delete_know)

module.exports = router