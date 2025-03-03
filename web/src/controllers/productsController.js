const {
    products,
    images,
    imagesProducts,
    tagsProducts,
    tags,
    user,
    productoUser,
} = require("../database/models/index");

const productController = {
    index: async(req, res) => {
        let productos = await products.findAll({ include: { all: true } });
        //return res.send(productos)
        return res.render("products/productList", {
            title: "Product List",
            products: productos,
        });
    },
    detail: async(req, res) => {
        let productDB = await products.findByPk(parseInt(req.params.id), { include: { all: true } });
        if (!productDB) {
            return res.redirect("/products/productList");
        }
        return res.render("products/details", {
            title: "Product Details",
            product: productDB,
        });
    },
    createProducts: async(req, res) => {
        return res.render("products/createProducts", {
            title: "Create Products",
        });
    },
    save: async(req, res) => {
        let userCreator = req.session.user;
        let newProduct = await products.create({
            tittle: req.body.tittle,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            days: req.body.days != "" ? parseInt(req.body.days) : null,
            nights: req.body.nights != "" ? parseInt(req.body.nights) : null,
            stars: req.body.stars != "" ? parseInt(req.body.stars) : null,
            base: req.body.base,
            excursion: req.body.excursion,
            category: req.body.category,
            transfers: req.body.transfers,
            regionId: req.body.regionId != "" ? parseInt(req.body.regionId) : null,
            flights: req.body.flights,
            status: req.body.status,
            salesPrice: req.body.salesPrice != "" ? parseInt(req.body.salesPrice) : null,
            creatorId: userCreator.id,
        });

        //Save Tags
        if (req.body.tags && req.body.tags.length > 0) {
            let newTags = await Promise.all(
                req.body.tags.split(" ").map((tag) => {
                    console.log(tag);
                    return tags.create({
                        tags: tag,
                    });
                })
            );

            let addTagsProducts = await Promise.all(
                newTags.map((tagProduct) => {
                    return tagsProducts.create({
                        productId: newProduct.id,
                        tagId: tagProduct.id,
                    });
                })
            );
        }

        //Save Images
        if (req.files && req.files.length > 0) {
            let imagenes = await Promise.all(
                req.files.map((file) => {
                    return images.create({
                        images: file.filename,
                    });
                })
            );
            let addProductImages = await Promise.all(
                imagenes.map((image) => {
                    return imagesProducts.create({
                        product: newProduct.id,
                        image: image.id,
                    });
                })
            );
        }

        return res.redirect("/products/productList");
    },
    editProduct: async(req, res) => {
        let productDB = await products.findByPk(req.params.id, {
            include: { all: true },
        });
        if (!productDB) {
            return res.redirect("/products/productList");
        }
        return res.render("products/editProduct", {
            title: "Edit Product",
            product: productDB,
        });
    },
    modify: async(req, res) => {
        let productsDB = await products.findByPk(req.params.id, {
            include: { all: true },
        });

        await productsDB.update({
            tittle: req.body.tittle,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            days: req.body.days,
            nights: req.body.nights,
            stars: req.body.stars,
            base: req.body.base,
            excursion: req.body.excursion,
            category: req.body.category,
            transfers: req.body.transfers,
            flights: req.body.flights,
            region: req.body.region,
            status: req.body.status,
            salesPrice: parseFloat(req.body.salesPrice),
        });

        //Update Images
        if (req.files && req.files.length > 0) {
            let imagenes = await Promise.all(
                req.files.map((file) => {
                    return images.update({
                        images: file.filename,
                    }, {
                        where: {
                            id: productsDB.images[0].id,
                        },
                    });
                })
            );
            let addProductImages = await Promise.all(
                imagenes.map((image) => {
                    return imagesProducts.update({
                        image: image.id,
                    }, {
                        where: {
                            product: productsDB.id,
                        },
                    });
                })
            );
        }

        //Borro los Tags que tenia
        await tagsProducts.destroy({
            where: {
                productID: productsDB.id,
            },
        });
        // creo los nuevos tags y asocio
        //Save Tags
        if (req.body.tags && req.body.tags.length > 0) {
            let newTags = await Promise.all(
                req.body.tags.split(" ").map((tag) => {
                    console.log(tag);
                    return tags.create({
                        tags: tag,
                    });
                })
            );
            let addTagsProducts = await Promise.all(
                newTags.map((tagProduct) => {
                    return tagsProducts.create({
                        productId: productsDB.id,
                        tagId: tagProduct.id,
                    });
                })
            );
        }
        return res.redirect("/products/details/" + req.params.id);
    },
    cart: async(req, res) => {
        let productDB = await products.findByPk(req.params.id);
        if (!productDB) {
            return res.redirect("/products/productList");
        }
        return res.render("products/cart", {
            title: "Cart Checkout",
            product: productDB,
        });
    },
    deleteProduct: async(req, res) => {
        let productDB = await products.findByPk(req.params.id, {
            include: { all: true },
        });
        if (!productDB) {
            return res.redirect("/products/productList");
        }
        await imagesProducts.destroy({
            where: {
                product: productDB.id,
            },
        });

        await images.destroy({
            where: {
                id: productDB.images[0].id,
            },
        });

        await tagsProducts.destroy({
            where: {
                productID: productDB.id,
            },
        });

        await products.destroy({
            where: {
                id: productDB.id,
            },
        });
        return res.redirect("/products/productList");
    },
    reservation: async(req, res) => {
        let newReservation = await passengers.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationalID: req.body.nationalID,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
        });
    },
    filterRegion: async(req, res) => {
        let productosR = await products.findAll({
            where: {
                regionId: req.params.regions,
            },
            include: { all: true }
        }, );

        return res.render("products/productList", {
            title: "Product Lista",
            products: productosR,
        });
    },
    filterCategory: async(req, res) => {
        let productosC = await products.findAll(

            {
                where: {
                    category: req.params.category,
                },
                include: { all: true }
            },

        );

        return res.render("products/productList", {
            title: "Product Lista",
            products: productosC,
        });
    },
    filterTags: async(req, res) => {
        return res.send(productosT)
        let productosT = await products.findAll(

            {
                where: {
                    tags: req.params.tag,
                },
                include: { all: true }
            },

        );
        
        return res.render("products/productList", {
            title: "Product Lista",
            products: productosT,
        });
    },
};

module.exports = productController;