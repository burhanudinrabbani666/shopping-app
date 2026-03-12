const Product = require("../models/product");

//------------------------------------------//
//            Get Methode                   //
//------------------------------------------//

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product - Shop",
    path: "/admin/add-product",
    formCss: true,
    productsCss: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect("/");
  }

  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit product - Shop",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Product- Shop",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};

//------------------------------------------//
//            Post Methode                  //
//------------------------------------------//

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title,
    imageUrl,
    price,
    description,
  })
    .then((result) => console.log(`${title} Succesfully Crearted`))
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // Create new update product object
  const updatedProduct = new Product(
    id,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice,
  );

  updatedProduct._save();

  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.deleteProductById(id);

  res.redirect("/admin/products");
};
