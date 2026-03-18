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
    .then((productData) => {
      if (!productData) return res.redirect("/");

      const product = { ...productData._doc, _id: productData._id.toString() };

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
  Product.find()
    .then((productsData) => {
      const products = productsData.map((product) => {
        return {
          title: product.title,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          _id: product._id.toString(),
        };
      });

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

  const product = new Product({ title, price, description, imageUrl });

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

  Product.findById(id)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      product.updatedAt = new Date();

      return product.save();
    })
    .then(() => {
      console.log("Updated Product!");
      res.redirect("/admin/products");
    })
    .catch();
};

exports.postDeleteProduct = (req, res) => {
  const id = req.body.productId;

  Product.deleteById(id)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};
