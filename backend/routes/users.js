const express = require("express");
const router = express.Router();
const { getAllUsers,deleteUser } = require("../controllers/users");

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;