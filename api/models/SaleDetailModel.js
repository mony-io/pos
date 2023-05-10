const db = require("../config/db");

class SaleDetail {
  constructor(products) {
    this.products = products;
    console.log(this.products);
  }
  save() {
    const sql =
      "INSERT INTO tblSaleDetails(sale_id,product_id,qty_sales) VALUES ?";
    return db.query(sql, [
      this.products.map((item) => [item.sale_id, item.product_id, item.qty]),
    ]);
  }

  static deleteSaleDetails(sale_id) {
    const sql = "DELETE FROM tblSaleDetails WHERE `sale_id` = ?";
    return db.query(sql, [sale_id]);
  }

  static fetchSaleProduct(id) {
    const sql = "CALL SP_FetchSaleProduct(?)";
    return db.execute(sql, [id]);
  }

  static updateSaleQty(qty, sale_id, pro_id) {
    const sql =
      "UPDATE tblSaleDetails SET qty_sales = ? WHERE sale_id = ? AND product_id = ?";
    return db.query(sql, [qty, sale_id, pro_id]);
  }
}

module.exports = SaleDetail;
