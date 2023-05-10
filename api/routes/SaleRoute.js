const express = require("express");

const router = express.Router();
const Sale = require("../controllers/SaleController");

router.post("/api/sale", Sale.create);
router.get("/api/list-sales", Sale.ListSales);
router.delete("/api/sale/:id", Sale.delete_sale);
router.get("/sale-reports", Sale.sale_reports);
router.get("/today-sale", Sale.todaySale);
router.put("/api/sales/:id", Sale.update);

module.exports = router;
