"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app_1.app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
    });
}
exports.default = app_1.app;
