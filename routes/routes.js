const router = require('express').Router();

const {
    getHomepage,
    userSignup
} = require('../controller/controller.js');


/**
 * @desc   Opens the homepage
 * @route  GET /api/
 * @access Public
 */

router
    .route('/')
    .get(getHomepage);



/**
* @desc   Opens the homepage
* @route  POST /api/signup
* @access Public
*/

router
    .route('/signup')
    .post(userSignup);



module.exports = router;
