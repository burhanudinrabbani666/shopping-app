# Creating New Users

## Overview

This page covers two things:

1. Building a `User` model with `save()` and `findById()` methods
2. Attaching the current user to every incoming request via middleware in `app.js`

---

## 1. The User Model

```js
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  // Inserts this user instance into the "users" collection
  save() {
    const db = getDB();

    return db
      .collection("users")
      .insertOne(this)
      .then(() => console.log("User created successfully!"))
      .catch((error) => console.log(error));
  }

  // Looks up a single user document by their MongoDB _id
  static findUserById(id) {
    const db = getDB();

    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) }) // findOne returns the document directly
      .then((user) => {
        return user;
      })
      .catch((error) => console.log(error));
  }
}
```

### How It Works

**`save()`** — a regular instance method. Calling `user.save()` inserts the current object into MongoDB. Since `this` refers to the instance, all constructor properties (`username`, `email`) are saved as fields on the document.

**`findUserById(id)`** — a `static` method, meaning you call it on the class itself (`User.findUserById(...)`) rather than on an instance. It accepts a string ID, converts it to a MongoDB `ObjectId`, and queries for a matching document.

> **Bug fix:** The original code used `.find()`, which returns a **cursor** (a stream of results), not a user document. For a single lookup by `_id`, use `.findOne()` — it returns the document directly, or `null` if not found.

| Method                   | Returns                                          |
| ------------------------ | ------------------------------------------------ |
| `.find({ _id: ... })`    | A cursor — you must call `.toArray()` or iterate |
| `.findOne({ _id: ... })` | The matched document, or `null`                  |

---

## 2. Create a Dummy User in MongoDB Atlas

Before wiring up the middleware, manually insert a test user directly in MongoDB Atlas (or via `mongosh`) so there's a real user to look up:

```json
{
  "username": "testuser",
  "email": "test@example.com"
}
```

Copy the `_id` value from the inserted document — you'll need it in the next step.

---

## 3. Attach the User to Every Request (`app.js`)

```js
// middleware/userLoader.js (or inline in app.js)
app.use((req, res, next) => {
  // Fetch the user from MongoDB and attach them to the request object
  User.findUserById("69b8c1e3b387ed269d055ffd") // Replace with your dummy user's _id
    .then((user) => {
      req.user = user; // Now every route handler can access req.user
      next(); // Pass control to the next middleware/route
    })
    .catch((error) => console.log(error));
});
```

### How It Works

Express middleware runs on **every incoming request**, in the order it's registered. By attaching the user to `req.user` here, any route handler registered **after** this middleware can access the logged-in user without repeating the database lookup.

> **Note:** This is a simplified setup for development. A real app would read the user ID from a session or JWT token, not hardcode it. The pattern (`req.user = user`) stays the same — only the ID source changes.

---

## Complete Flow

```
Incoming HTTP Request
        │
        ▼
app.use middleware runs
  → User.findUserById("69b8c1e3...")
  → MongoDB looks up user by ObjectId
  → req.user = { username, email, _id }
  → next() called
        │
        ▼
Route handler executes
  → req.user is available here
```

---

Next: [Storing the User in Our Database](./19-storing-the-user-in-our-database.md)
