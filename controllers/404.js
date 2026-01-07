exports.getErrorMessage = (req, res, next) => {
  res.status(400).render("404", {
    pageTitle: "Page not found",
    path: "",
  });
};
