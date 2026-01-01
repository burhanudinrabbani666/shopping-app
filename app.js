const http = require("http");
const express = require("express");

const app = express();

// Creating Server
const server = http.createServer(app);
server.listen(3000);
