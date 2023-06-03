const Category = require('../models/model.category');
require('dotenv').config();

exports.createNewCategory = async (req, res, next) => {
  try {
    const [dupCategory, _] = await Category.findByName(req.body.categoryName);
    if (dupCategory.length !== 0) {
      return res.send({
        message: 'ប្រភេទមានរួចរាល់ហើយ!',
        success: false,
      });
    }

    // create new category
    let category = new Category(req.body.categoryName, req.body.desc);
    category = await category.save();

    res.status(201).json({ message: 'ប្រភេទត្រូវបានបង្កើត!', success: true });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    // delete category
    const [cat_use] = await Category.CategoryProducts(req.params.id);
    if(cat_use[0].length>0){
      return res.send({
        message:"ការលុបបរាជ័យ! ក្រុមផលិតផលត្រូវបានប្រើប្រាស់...",success:false
      })
    } 
    const [result] = await Category.deleteById(req.params.id);

    if (result.affectedRows !== 0) {
      return res.send({ message: 'ក្រុមផលិតផលត្រូវ​បាន​លុបដោយជោគជ័យ!', success: true });
    }
    // if failed
    res.send({ message: 'ការលុបបរាជ័យ!', success: false });
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    // check if update duplicate value
    const [dupValue] = await Category.updateDuplicate(
      req.params.id,
      req.body.categoryName
    );
    if (dupValue.length !== 0) {
      return res.send({ message: 'ប្រភេទមានរួចរាល់ហើយ!', success: false });
    }

    const [result] = await Category.updateById(
      req.body.categoryName,
      req.body.desc,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res.status(201).send({ message: 'ប្រភេទត្រូវបានកែប្រែដោយជោគជ័យ!', success: true });
    } else {
      res
        .status(200)
        .send({ message: 'ប្រភេទត្រូវបានកែប្រែដោយបរាជ័យ!', success: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.findOneById = async (req, res, next) => {
  try {
    const [category, _] = await Category.findById(req.params.id);
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

exports.findAllCategories = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const keyword = req.query.search || '';

    const [nRows] = await Category.getRows(keyword);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await Category.findAll(limit, page, keyword);

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

exports.allCategories = async (req, res, next) => {
  try {
    const [result] = await Category.getAllCategories();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

