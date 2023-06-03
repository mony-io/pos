const Brand = require("../models/model.brand");

exports.createNewBrand = async (req, res, next) => {
  try {
    if (!req.body.brandName) {
      return res.send({ message: "សូម! បញ្ចូលឈ្មោះម៉ាក", success: false });
    }

    // check duplicate
    const [brandName, _] = await Brand.findByName(req.body.brandName);
    if (brandName.length !== 0) {
      return res.send({
        message: "ឈ្មោះម៉ាកនេះមានរួចហើយ។ សូម! សាកល្បងម្ដងទៀត",
        success: false,
      });
    }

    // create new brand
    let brand = new Brand(req.body.brandName, req.body.desc);
    brand = await brand.save();

    res.status(201).json({ message: "ម៉ាកត្រូវបានបង្កើតឡើង!", success: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteBrandById = async (req, res, next) => {
  try {
    const [brand] = await Brand.deleteById(req.params.id);

    if (brand.affectedRows !== 0) {
      return res.send({
        message: "ឈ្មោះម៉ាកត្រូវបានលុប!",
        success: true,
      });
    } else {
      res.send({ message: "ការលុបបានបរាជ័យ!", success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    // check if update duplicate brand name
    const [brand] = await Brand.updateDuplicate(
      req.params.id,
      req.body.brandName
    );

    if (brand.length !== 0) {
      return res.send({ message: "ម៉ាកមានរួចហើយ!" });
    }

    const [result] = await Brand.updateById(
      req.body.brandName,
      req.body.desc,
      req.params.id
    );

    if (result.affectedRows !== 0) {
      res
        .status(201)
        .send({ message: "ម៉ាកត្រូវបានធ្វើកែប្រែ!", success: true });
    } else {
      res.send({ message: "ម៉ាកត្រូវបានធ្វើកែប្រែបរាជ័យ!", success: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [brand, _] = await Brand.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    next(err);
  }
};

exports.findAllBrands = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const keyword = req.query.search || "";

    const [nRows] = await Brand.getRows(keyword);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);

    const [result] = await Brand.findAll(limit, page, keyword);

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

exports.AllBrands = async (req, res, next) => {
  try {
    const [result] = await Brand.getAllBrands();
    res.send(result);
  } catch (err) {
    next(err);
  }
};