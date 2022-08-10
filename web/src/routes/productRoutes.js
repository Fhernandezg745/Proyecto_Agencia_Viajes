const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
const storage = require("../modules/storage");
const multer = require("multer");
const upload = multer({ storage: storage("products") });
const isAdmin = require("../middlewares/isAdmin");
const isLogged = require("../middlewares/isLogged");



router.get("/productList", productsController.index);
// router.get("/productList/:category?/:param?", productsController.filtro);

router.get("/createProducts", isLogged, productsController.createProducts);
router.post("/save", [upload.any()], productsController.save);

router.get("/details/:id", productsController.detail);

router.get("/editProduct/:id", isLogged, productsController.editProduct);

router.put("/editProduct", [upload.any()], productsController.modify);

router.get("/cart/:id", productsController.cart);

router.delete("/delete/:id", productsController.deleteProduct);

//router.delete("/delete/:id", productsController.deleteProduct);

module.exports = router;