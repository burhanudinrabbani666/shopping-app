## Summary

## What is Express.js

- ExpressJs is node.js framewokr --a package that add a bunch of utility functions and tools and a clear set of rules on how the app should be built(middleware!)
- Its highlly extensible and other packages can be plugged into it (middleware!)

## Middleware, next() adn res()

- express.js relies heavly on middleware functions -- you can easly add them by calling use()
- Middleware functions handle a request and should call next() to forward the request to the next function in line or send response

## Routing

- You can filter request by path and method
- if you filter by method, paths are matched exactly, otherwise, the first segment of a URL is matched
- You can use the express.Router to split your routes accross file elegantly

## Server files

your not limited to serving dummy text as a respons
you can sendFile() to your users --e.g HTML files
is a request is directly made for a file (e.g. a .css file is requested). you can enable static serving for such file via express.static()
