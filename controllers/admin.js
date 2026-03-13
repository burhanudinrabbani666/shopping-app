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

  Product.findByPk(productId)
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

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // This sequilize syntax for connecting user id to product
  req.user
    .createProduct({ title, imageUrl, price, description })
    .then(() => {
      console.log(`${title} Succesfully Crearted`);

      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(id)
    .then((product) => {
      // Edit
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;

      return product.save(); // Save Back in Database (Overwrite)
    })
    .then(() => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res) => {
  const id = req.body.productId;

  Product.destroy({ where: { id } })
    .then(() => {
      console.log("Delete Product");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
