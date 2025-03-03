const { Router } = require("express");
const router = Router();

const {
    index,
    createProducts,
    save,
    detail,
    editProduct,
    modify,
    cart,
    deleteProduct,
    reservation,
    filterRegion,
    filterCategory,
    filterTags
} = require("../controllers/productsController");
const storage = require("../modules/storage");
const multer = require("multer");
const upload = multer({ storage: storage("products") });
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

router.get("/productList", index);
router.get("/productList/tags/:tag", filterTags);
router.get("/productList/regions/:regions", filterRegion);
router.get("/productList/category/:category", filterCategory);


router.get("/createProducts", [isLogged, isAdmin], createProducts);
router.post("/save", [upload.any()], save);

router.get("/details/:id", detail);

router.get("/editProduct/:id", [isLogged, isAdmin], editProduct);

router.put("/editProduct/:id", [upload.any()], modify);

router.get("/cart/:id", cart);
router.post("/cart/:id", reservation);

router.delete("/delete/:id", deleteProduct);

module.exports = router;