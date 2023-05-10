const express = require("express");

const router = express.Router();
const SaleDetail = require("../controllers/SaleDetailController");

router.post("/api/sale_detail", SaleDetail.create);
router.get("/api/sale_products/:id", SaleDetail.fetchSaleProductsById);
router.put("/api/sale_detail/:id", SaleDetail.updateSaleDetails);

module.exports = router;
