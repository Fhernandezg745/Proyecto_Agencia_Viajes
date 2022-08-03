const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
const storage = require("../modules/storage");
const multer = require("multer");
const upload = multer({ storage: storage("products") });



router.get("/productList", productsController.index);
// router.get("/productList/:category?/:param?", productsController.filtro);

router.get("/createProducts", productsController.createProducts);
router.post("/save", [upload.any()], productsController.save);

router.get("/details/:id", productsController.detail);

router.get("/editProduct/:id", productsController.editProduct);

router.put("/editProduct", function(req, res){res.send("fui por puto")});


//[upload.any()], productsController.modify
router.get("/cart", productsController.cart);

router.delete("/delete/:id", productsController.deleteProduct);

module.exports = router;