const express = require("express")
const router = express.Router()

const {register,login,createOrder,OrderDetails} = require('../controllers/user.js')

router.route('/register').post(register)
router.route('/login').post(login)
router.route("/addOrder").post(createOrder)
router.route("/:userId/get-order").get(OrderDetails)

module.exports = router