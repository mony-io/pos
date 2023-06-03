const ProductUnits = require('../models/model.productunit');

exports.createNewUnit = async (req, res, next) => {
  try {
    if (req.body.unit === '') {
      return res.send({
        message: 'សូម! បញ្ចូលឈ្មោះឯកតា...!',
        success: false,
      });
    }

    // check if unit already existing
    const [result] = await ProductUnits.findByUnit(req.body.unit);

    if (result.length !== 0) {
      return res.send({ message: 'ឯកតាមានរួចហើយ...!', success: false });
    }

    let productUnit = new ProductUnits(req.body.unit);
    productUnit = await productUnit.save();
    res
      .status(201)
      .send({ message: 'ឯកតាបានបង្កើតដោយជោគជ័យ...!', success: true });
  } catch (err) {
    next(err);
  }
};

exports.updateUnit = async (req, res, next) => {
  try {
    if (req.body.unit === '') {
      return res.send({ message: 'សូម! បញ្ចូលឯកតាផលិតផល...!' });
    }

    // check update duplicate
    const [unit] = await ProductUnits.duplicateUnit(
      req.body.unit,
      req.params.id
    );
    //console.log(unit);
    if (unit.length !== 0) {
      return res.send({ message: 'ឯកតាផលិតផលមានរួចហើយ...!', success: false });
    }

    const [result] = await ProductUnits.updateById(
      req.body.unit,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.send({ message: 'ឯកតាផលិតផលត្រូវបានកែប្រែដោយជោគជ័យ...!', success: true });
    } else {
      res.send({ message: 'ឯកតាផលិតផលត្រូវបានកែប្រែបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteUnit = async (req, res, next) => {
  try {
    //console.log(req.params.id)
    const [unit] = await ProductUnits.unit_product(req.params.id)
    //console.log(unit[0])
    if(unit[0].length>0){
      return res.send({
        message:"ការលុបរាជ័យ! ឯកតាត្រវបានប្រើប្រាស់ជាមួយផលិតផល...!",success:false
      })
    }
    const [result] = await ProductUnits.deleteById(req.params.id);
    if (result.affectedRows !== 0) {
      res.send({ message: 'បានលុបឯកតា...!', success: true });
    } else {
      res.send({ message: 'បានលុបឯកតា...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [unit] = await ProductUnits.findById(req.params.id);
    res.send(unit);
  } catch (err) {
    next(err);
  }
};

exports.findAllUnit = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const keyword = req.query.search || '';

    const [nRows] = await ProductUnits.getRows(keyword);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await ProductUnits.findAll(limit, page, keyword);

    res.send({
      result: result[0],
      limit: limit,
      page: page,
      totalRows: nRows[0][0].totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    next(error);
  }
};

exports.AllUnits = async (req, res, next) => {
  try {
    const [result] = await ProductUnits.getAllUnits();
    res.send(result);
  } catch (err) {
    next(err);
  }
};