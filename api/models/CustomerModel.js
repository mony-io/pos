const db = require('../config/db');

class Customer {
  constructor(customerName, phoneNumber, email, address) {
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
  }

  save() {
    const sql =
      'INSERT INTO tblCustomers(customerName,phoneNumber,email,`address`) VALUES(?,?,?,?)';
    return db.execute(sql, [
      this.customerName,
      this.phoneNumber,
      this.email,
      this.address,
    ]);
  }

  static findByName(name) {
    const sql = 'SELECT *FROM tblCustomers WHERE customerName = ?';
    return db.execute(sql, [name]);
  }

  static findByPhoneNumber(pn) {
    const sql = 'SELECT *FROM tblCustomers WHERE phoneNumber = ?';
    return db.execute(sql, [pn]);
  }

  static searchByName(name) {
    const sql =
      "SELECT customerName,id FROM tblCustomers WHERE customerName LIKE concat(?,'%')";
    return db.execute(sql, [name]);
  }

  static findAll(limit, page, search) {
    const sql = 'CALL SP_List_Customers(?,?,?)';
    return db.execute(sql, [limit, page, search]);
  }

  static fetchRows(search) {
    const sql = 'CALL SP_GetRowCustomers(?)';
    return db.execute(sql, [search]);
  }

  static fetchRows(search) {
    const sql = 'CALL SP_GetRowCustomers(?)';
    return db.execute(sql, [search]);
  }

  static deleteById(id) {
    const sql = 'DELETE FROM tblCustomers WHERE id = ?';
    return db.execute(sql, [id]);
  }

  static UpdateCustomer(customerName, email, phoneNumber, address, id) {
    const sql = 'CALL UpdateCustomerData(?,?,?,?,?)';
    return db.query(sql, [customerName, email, phoneNumber, address, id]);
  }

  static findById(id) {
    const sql = 'SELECT *FROM tblCustomers WHERE id = ?';
    return db.execute(sql, [id]);
  }

  static checkUpdateDuplicate(id, phoneNumber) {
    const sql = 'SELECT *FROM tblCustomers WHERE NOT id = ? AND phoneNumber=?';
    return db.execute(sql, [id, phoneNumber]);
  }
}

module.exports = Customer;
