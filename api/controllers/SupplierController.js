const Supplier = require('../models/model.supplier');

exports.createNewSupplier = async (req, res, next) => {
  try {
    const supname = req.body.supName || '';
    const phone = req.body.phone || '';

    if (supname === '') {
      return res.send({
        message: 'សូមបញ្ចូលឈ្មោះអ្នកផ្គត់ផ្គង់!',
        success: false,
      });
    }

    if (phone === '') {
      return res.send({
        message: 'សូមបញ្ចូលលេខទូរសព្ទអ្នកផ្គត់ផ្គង់!',
        success: false,
      });
    }

    const [result] = await Supplier.findByPhoneNumber(phone);
    //console.log(result);
    if (result.length > 0) {
      return res.send({
        message: 'លេខទូរសព្ទមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!',
        success: false,
      });
    }

    let supplier = new Supplier(
      req.body.supName,
      req.body.companyName,
      req.body.email,
      req.body.phone,
      req.body.address
    );
    supplier = await supplier.save();
    res.send({
      message: 'អ្នកផ្គត់ផ្គង់ត្រូវបានបញ្ចូលដោយជោគជ័យ!',
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.findAllSupplier = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const keyword = req.query.search || '';

    // fetch all record
    const [nRows] = await Supplier.findAllRows(keyword);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await Supplier.findAll(limit, page, keyword);

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

exports.deleteSupplier = async (req, res, next) => {
  try {
    const [result] = await Supplier.deleteById(req.params.id);
    if (result.affectedRows !== 0) {
      res.send({
        message: 'អ្នកផ្គត់ផ្គង់ត្រូវបានលុបចេញពីប្រព័ន្ធ!',
        success: true,
      });
    } else {
      res.send({ message: 'ការលុបបរាជ័យ', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [supplier] = await Supplier.findById(req.params.id);
    res.send(supplier);
  } catch (err) {
    next(err);
  }
};

exports.updateSupplier = async (req, res, next) => {
  try {
    const supname = req.body.supName || '';
    const phone = req.body.phone || '';
    const id = req.params.id || 0;

    if (supname === '') {
      return res.send({
        message: 'សូមបញ្ចូលឈ្មោះអ្នកផ្គត់ផ្គង់!',
        success: false,
      });
    }

    if (phone === '') {
      return res.send({
        message: 'សូមបញ្ចូលលេខទូរសព្ទអ្នកផ្គត់ផ្គង់!',
        success: false,
      });
    }

    if (id === 0 || id === '') {
      return res.send({
        message: 'ការកែប្រែបរាជ័យ!',
        success: false,
      });
    }

    const [dup] = await Supplier.updateDuplicate(id, phone);
    if (dup.length > 0) {
      return res.send({
        message: 'លេខទូរសព្ទមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!',
        success: false,
      });
    }

    const [result] = await Supplier.updateById(
      req.body.supName,
      req.body.companyName,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.send({
        message: 'អ្នកប្រើប្រាស់ត្រូវបានកែប្រែដោយជោគជ័យ!',
        success: true,
      });
    } else {
      res.send({ message: 'ការកែប្រែត្រូវបានបរាជ័យ!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteSupplier = async (req, res, next) => {
  try {
    const id = req.params.id || 0;

    if (id === 0 || id === '') {
      return res.send({
        message: 'ការលុបត្រូវបានបរាជ័យ!',
        success: false,
      });
    }

    const [result] = await Supplier.deleteById(req.params.id);

    if (result.affectedRows !== 0) {
      res.send({
        message: 'អ្នកផ្គត់ផ្គង់ត្រូបបានលុបចេញពីប្រព័ន្ធ!',
        success: true,
      });
    } else {
      res.send({ message: 'ការលុបត្រូវបានបរាជ័យ!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.AllSuppliers = async (req, res, next) => {
  try {
    const [result] = await Supplier.getAllSuppliers();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
