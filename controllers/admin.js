const Product = require("../models/product");

//------------------------------------------//
//            Get Methode                   //
//------------------------------------------//

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product - Shop",
    path: "/admin/add-product",
    formCss: true,
    productsCss: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect("/");
  }

  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) return res.redirect("/");

      res.render("admin/edit-product", {
        pageTitle: "Edit product - Shop",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res) => {
  Product.fetchALl()
    .then((products) => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Product- Shop",
        path: "/admin/products",
      });
    })
    .catch((error) => console.log(error));
};

//------------------------------------------//
//            Post Methode                  //
//------------------------------------------//

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id,
  );

  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch();
};

exports.postEditProduct = (req, res) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updateProduct = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    id,
  );

  updateProduct
    .save()
    .then(() => {
      console.log("Updated Product!");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res) => {
  const id = req.body.productId;

  Product.deleteById(id)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
