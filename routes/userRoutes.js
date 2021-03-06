const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require("../controllers/userController")

const router = require("express").Router()

router.route("/").get(getAllUsers).post(createUser)

router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser)

module.exports = router