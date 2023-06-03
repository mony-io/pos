const db = require("../config/db");

class Sale {
  constructor(user_id, customer_id, invoice_id, desc) {
    this.user_id = user_id;
    this.customer_id = customer_id;
    this.invoice_id = invoice_id;
    this.desc = desc;
  }
  save() {
    const sql =
      "INSERT INTO tblSales(user_id,customer_id,invoice_id,sale_date,`desc`) VALUES(?,?,?,CURRENT_DATE(),?)";
    return db.execute(sql, [
      this.user_id,
      this.customer_id,
      this.invoice_id,
      this.desc,
    ]);
  }

  static listSales(limit, page, user_id, role, search) {
    const sql = "CALL SP_ListSales(?,?,?,?,?)";
    return db.execute(sql, [limit, page, user_id, role, search]);
  }

  static rowListSale(invoice_number) {
    const sql = "CALL SP_RowsListSale(?)";
    return db.execute(sql, [invoice_number]);
  }

  static DeleteSale(id) {
    const sql = "CALL SP_DeleteSale(?)";
    return db.execute(sql, [id]);
  }

  static SaleReports(limit, page, search, start_date = "", end_date = "") {
    let sql = "";
    if (start_date !== "" && end_date !== "") {
      sql = "CALL SP_SaleReportsWidthDate(?,?,?,?,?)";
      return db.execute(sql, [limit, page, search, start_date, end_date]);
    } else {
      sql = "CALL SP_SaleReports(?,?,?)";
      return db.execute(sql, [limit, page, search]);
    }
  }

  static todaySale() {
    const sql = "SELECT *FROM V_todaySale";
    return db.execute(sql);
  }

  static update_sale(id, customer_id, desc) {
    const sql = "UPDATE tblSales SET customer_id=?,`desc`=? WHERE sale_id=?";
    return db.query(sql, [id, customer_id, desc]);
  }

  static totalAmountAndPaymentType() {
    const sql = "SELECT *FROM V_TotalPaymentToday";
    return db.execute(sql);
  }
  
}

module.exports = Sale;
