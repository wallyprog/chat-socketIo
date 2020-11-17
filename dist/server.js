"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let port = 8100;
app_1.default.server.listen(port, function () {
    console.log(`server running in" ${port}`);
});
