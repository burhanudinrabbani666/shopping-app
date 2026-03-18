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
    // .select("ti")
    // .populate("userId") // This make get all data of userId
    .then((productsData) => {
      const products = productsData.map((product) => {
        return {
          ...product._doc,
          _id: product._id.toString(),
        };
      });

      console.log(products);

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

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch();
};

exports.postEditProduct = (req, res) => {
  const id = req.body.productId; // "12nnk12u1k24bk2bkadk2u1"
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  // 1.
  Product.updateOne(
    { _id: id },
    {
      title: updatedTitle,
      price: updatedPrice,
      imageUrl: updatedImageUrl,
      description: updatedDesc,
      updatedAt: new Date(),
    },
    { runValidators: true },
  )
    .then(() => {
      console.log("Updated Products!");
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

exports.postDeleteProduct = (req, res) => {
  const id = req.body.productId;

  Product.findOneAndDelete(id)
    .then(() => res.redirect("/admin/products"))
    .catch((error) => console.log(error));
};
