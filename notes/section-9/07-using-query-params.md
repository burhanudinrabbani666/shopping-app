# Using Query Parameters in Express.js

Query parameters let you pass optional data through a URL without changing the route structure — ideal for toggling modes like "edit" or filtering data.

---

## The Route Handler

```js
exports.getEditProduct = (req, res, next) => {
  // Extract the 'edit' query param from the URL
  // e.g. /admin/edit-product/123?edit=true  →  editMode = 'true'
  const editMode = req.query.edit;

  // Guard: if no edit param, redirect to home
  if (!editMode) {
    return res.redirect("/");
  }

  // Render the edit page, passing the editMode flag to the view
  res.render("admin/edit-product", {
    pageTitle: "Edit product - Shop",
    path: "/admin/edit-product",
    editing: editMode, // available as `editing` in the template
  });
};
```

---

## How It Works

| Step | What happens                                                     |
| ---- | ---------------------------------------------------------------- |
| 1    | User visits `/admin/edit-product/123?edit=true`                  |
| 2    | Express parses everything after `?` into `req.query`             |
| 3    | `req.query.edit` returns the string `"true"`                     |
| 4    | The guard check passes → view is rendered with `editing: "true"` |
| 5    | If `?edit` is absent → user is redirected to `/`                 |

---

## Key Concepts

**`req.query`** — An object Express automatically populates with all URL query parameters.

```
URL:  /admin/edit-product/123?edit=true&foo=bar
      req.query → { edit: 'true', foo: 'bar' }
```

**Important:** Query param values are always **strings**, not booleans. `req.query.edit` returns `"true"`, not `true`. In your template, treat it accordingly or cast it explicitly:

```js
const editMode = req.query.edit === "true"; // converts to a real boolean
```

---

## Complete Request Flow

```
Browser                         Express Server
  │                                  │
  │  GET /admin/edit-product/123     │
  │       ?edit=true                 │
  │ ──────────────────────────────►  │
  │                                  │  req.query.edit = 'true'
  │                                  │  editMode is truthy → render view
  │  ◄────────────────────────────── │
  │    HTML: edit-product page       │
```

---

> **Note:** Always use `return res.redirect(...)` to stop execution after redirecting. Without `return`, Express will attempt to send a second response and throw an error.

---

Next: [Pre-populating the Edit Product Form](./08-pre-populating-the-edit-product.md)
