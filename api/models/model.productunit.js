const db = require('../config/db');

class ProductUnits {
  constructor(unit) {
    this.unit = unit;
  }

  save() {
    const sql = 'INSERT INTO tblProductUnits(`unit`) VALUES(?)';
    return db.execute(sql, [this.unit]);
  }

  static findById(id) {
    const sql = 'SELECT *FROM tblProductUnits WHERE id = ?';
    return db.execute(sql, [id]);
  }

  static findByUnit(unit) {
    const sql = 'SELECT *FROM tblProductUnits WHERE unit = ?';
    return db.execute(sql, [unit]);
  }

  static duplicateUnit(unit, id) {
    const sql = 'SELECT *FROM tblProductUnits WHERE NOT id=? AND unit=?';
    return db.execute(sql, [id, unit]);
  }

  static updateById(unit, id) {
    const sql = 'UPDATE tblProductUnits SET `unit`=? WHERE id = ?';
    return db.query(sql, [unit, id]);
  }

  static deleteById(id) {
    const sql = 'DELETE FROM tblProductUnits WHERE id = ?';
    return db.query(sql, [id]);
  }

  static findAll(limit, page, keyword) {
    const sql = 'CALL SP_ProductUnit(?,?,?)';
    return db.execute(sql, [limit, page, keyword]);
  }

  static getRows(search) {
    const sql = 'CALL SP_GetRowsProUnit(?)';
    return db.execute(sql, [search]);
  }

  static unit_product(id) {
    const sql = 'CALL UnitProducts(?)';
    return db.execute(sql, [id]);
  }

  static getAllUnits() {
    const sql = 'SELECT * FROM tblProductUnits';
    return db.execute(sql);
  }
}

module.exports = ProductUnits;
