## Converting to Handlebars

for the latest version of hadlebars. must use the engine method. and need to add extname

```js
app.engine(
  "handlebars",
  expressHbs.engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "handlebars",
  })
);
app.set("view engine", "handlebars");
```

[Next: Working With EJS](./10-working-with-EJS.md)
