const express = require("express");
const router = express.Router();
const Invoice = require("../controllers/InvoiceController");

router.post("/api/invoice", Invoice.create);
router.get("/api/saleInvoice/:id", Invoice.saleInvoice);
router.get("/api/view_invoice/:id", Invoice.view_invoice);
router.put("/api/invoices/:id", Invoice.update_invoice);

module.exports = router;
