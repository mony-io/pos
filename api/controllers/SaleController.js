const Sale = require('../models/SaleModel');
module.exports.create = async (req, res, next) => {
  try {
    let sale = new Sale(
      req.body.user_id,
      req.body.customer_id,
      req.body.invoice_id,
      req.body.desc
    );
    [sale] = await sale.save();
    res.send({ id: sale.insertId, success: true });
  } catch (err) {
    next(err);
  }
};

module.exports.ListSales = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const invoiceNumber = req.query.search || '';
    const user_id = req.query.user_id || 0;
    const role = req.query.role || 0;

    //console.log(req.query);

    if (user_id === 0) {
      return res.end();
    }

    if (+role > 1) {
      return res.end();
    }

    const [nRows] = await Sale.rowListSale(invoiceNumber);

    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await Sale.listSales(
      limit,
      page,
      user_id,
      role,
      invoiceNumber
    );

    //console.log(result)

    res.send({
      result: result[0],
      limit: limit,
      page: page,
      totalRows: nRows[0][0],
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.delete_sale = async (req, res, next) => {
  try {
    const [result] = await Sale.DeleteSale(req.params.id);
    if (result.affectedRows > 0) {
      res.send({
        message: 'ការលក់ត្រូវបានលុបចេញពីប្រព័ន្ធដោយជោគជ័យ...!',
        success: true,
      });
    } else {
      res.send({ message: 'ការលុបបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.sale_reports = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const invoiceNumber = req.query.invoiceNumber || '';
    let start_date = req.query.start_date || '';
    let end_date = req.query.end_date || '';

    // Check if the input is a valid date
    if (isNaN(new Date(start_date).getTime())) {
      start_date = '';
    }
    if (isNaN(new Date(end_date).getTime())) {
      end_date = '';
    }

    const [nRows] = await Sale.rowListSale(invoiceNumber);

    // calculate total page
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await Sale.SaleReports(
      limit,
      page,
      invoiceNumber,
      start_date,
      end_date
    );

    res.send({
      result: result[0],
      limit: limit,
      page: page,
      totalPage: totalPage,
      totalRows: nRows[0][0].totalRows,
    });
  } catch (err) {
    next(err);
  }
};

exports.todaySale = async (req, res, next) => {
  try {
    const [payment] = await Sale.totalAmountAndPaymentType();
    const [result] = await Sale.todaySale();
    res.send({ result: result, payment: payment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const cus_id = req.body.customer_id;
    const desc = req.body.desc;
    // console.log(id);
    // console.log(req.body);
    const [result] = await Sale.update_sale(id, cus_id, desc);
    console.log(result);
    if (result.affectedRows > 0) {
      res.send({ message: 'ការប្រែជោគជ័យ...!', success: true });
    } else {
      res.send({ message: 'ការប្រែបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};
