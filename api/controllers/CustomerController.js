const Customer = require('../models/CustomerModel');

module.exports.create = async (req, res, next) => {
  try {
    const name = req.body.customerName.trim() || '';
    if (name === '') {
      return res.send({
        message: 'សូមបញ្ជូលឈ្មោះអតិថិជន...!',
        success: false,
      });
    }

    const phone = req.body.phoneNumber.trim() || '';
    if (phone === '') {
      return res.send({
        message: 'សូមបញ្ជូលលេខអតិថិជន...!',
        success: false,
      });
    }

    let customer = new Customer(
      req.body.customerName.trim(),
      req.body.phoneNumber,
      req.body.email,
      req.body.address
    );

    // check if customer phone number already exist
    const [phoneNumber] = await Customer.findByPhoneNumber(
      req.body.phoneNumber
    );
    if (phoneNumber.length > 0) {
      return res.send({
        message: 'លេខអតិថិជនមានក្នុងប្រព័ន្ធរួចហើយ...!',
        success: false,
      });
    }

    customer = await customer.save();
    res.send({
      message: 'អតិថិជនត្រូវបានបញ្ចូលទៅក្នុងប្រព័ន្ធដោយជោគជជ័យ...!',
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.searchCustomerName = async (req, res, next) => {
  try {
    let { q } = req.query;
    if (q) {
      const [cus] = await Customer.searchByName(q);
      if (cus.length > 0) {
        res.send({ data: cus, success: true });
      } else {
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

// module.exports.findAll = async (req, res, next) => {
//   try {
//     const cus = await Customer.findAll();
//     res.send(cus);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports.findAll = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const keyword = req.query.search || '';

    const [nRows] = await Customer.fetchRows(keyword);
    //console.log(nRows);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);
    const [result] = await Customer.findAll(limit, page, keyword);
    // console.log(result);
    res.send({
      result: result[0],
      page: page,
      limit: limit,
      totalRows: nRows[0][0].totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteById = async (req, res, next) => {
  try {
    const [result] = await Customer.deleteById(req.params.id);
    if (result.affectedRows > 0) {
      res.send({
        message: 'អ្នកប្រើប្រាស់ត្រូវបានលុបដោយជោគជ័យ...!',
        success: true,
      });
    } else {
      res.send({ message: 'ការលុបត្រូវបានបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.update_customer = async (req, res, next) => {
  try {
    const customerName = req.body.customerName || '';
    const phone = req.body.phoneNumber || '';
    const email = req.body.email || '';
    const address = req.body.address || '';
    const id = req.params.id || 0;

    if (customerName === '') {
      return res.send({
        message: 'សូម! បញ្ចូលឈ្មោះអតិថិជន...!',
        success: false,
      });
    }
    if (phone === '') {
      return res.send({
        message: 'សូម! បញ្ចូលលេខទូរស័ព្ទអតិថិជន...!',
        success: false,
      });
    }

    if (id === 0 || id === '') {
      return res.send({ message: 'ការកែប្រែបរាជ័យ...!', success: false });
    }

    // check duplicate by phone number
    const [phone_duplicate] = await Customer.checkUpdateDuplicate(id, phone);
    if (phone_duplicate.length > 0) {
      return res.send({
        message: 'លេខទូរស័ព្ទមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ...!',
        success: false,
      });
    }

    const [result] = await Customer.UpdateCustomer(
      customerName,
      email,
      phone,
      address,
      id
    );
    if (result.affectedRows > 0) {
      res.send({
        message: 'អតិថិជនត្រូវបានកែប្រែដោយជោគជ័យ...!',
        success: true,
      });
    } else {
      res.send({ message: 'ការកែប្រែបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await Customer.findById(id);
    res.send(result);
  } catch (err) {
    next(err);
  }
};
