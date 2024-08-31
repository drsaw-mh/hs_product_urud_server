const Product = require("../models/product_model");
const resp = require("../utils/response");

let create = async (req, res, next) => {
    try {
        let body = req.body;
        let existingProduct = await Product.findOne({
            name: body.name,
        });
        if (existingProduct) {
            resp.throwError({
                message: "Product already exist",
                status: 400,
            });
        }
        let result = await Product(body).save();
        if (result) {
            resp.success(res, {
                message: "Product created successfully",
                status: 200,
                data: result,
            });
        } else {
            resp.throwError({
                message: "Failed to create product",
                status: 500,
            });
        }
    } catch (err) {
        next(err);
    }
};

let get = async (req, res, next) => {
    try {
        let result = await Product.find();
        if (result) {
            resp.success(res, {
                message: "Products fetched successfully",
                status: 200,
                data: result,
            });
        } else {
            resp.throwError({
                message: "Failed to fetch products",
                status: 500,
            });
        }
        
    } catch (err) {
        next(err);
    }

};

let update = async (req, res, next) => {
    try {
        let id = req.params.id;
        let body = req.body;

        let product = await Product.findById(id);
        if (product) {
            var result = await Product.findByIdAndUpdate(id, body);
            if (result) {
                let updatedProduct = Product.findByIdAndUpdate(id);
                resp.success(res, {
                    message: "Product updated successfully",
                    status: 200,
                    data: updatedProduct,
                });
            } else {
                resp.throwError({
                    message: "Failed to update product",
                    status: 500,
                });
            }
        } else {
            resp.throwError({
                message: "Product not found",
                status: 404,
            });
        }
    } catch (err) {
        next(err);
    }
};

let drop = async (req, res, next) => { 
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        if (product) {
            var result = await Product.findByIdAndDelete(id);
            if (result) {
                resp.success(res, {
                    message: "Product deleted successfully",
                    status: 200,
                    data: result,
                });
            } else {
                resp.throwError({
                    message: "Failed to delete product",
                    status: 500,
                });
            }
        } else {
            resp.throwError({
                message: "Product not found",
                status: 404,

            });
        }
    } catch (err) { 
        next(err);
    }
}

module.exports = {
    create,
    get,
    update,
    drop
}