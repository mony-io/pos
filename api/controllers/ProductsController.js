const Product = require('../models/model.products');
const deleteImg = require('../middlewares/deleteImage');
const fs = require('fs');

exports.createNewProduct = async (req, res, next) => {
  let path = '';
  if (req.file) {
    path = req.file.path;
  }else{
    path = 'images/default.png'
  }

  let expDate = req.body.exp_date;
  if (expDate === '') {
    expDate = null;
  }

  const categoryId = req.body.category_id;
  if (categoryId === '' || categoryId === 0) {
    return res.send({ message: 'សូម! ជ្រើសរើសក្រុមផលិតផល' });
  }
  // console.log(req.file);
  //console.log(req.body);
  try {
    // get product name
    const [product_name] = await Product.findProductByName(
      req.body.product_name
    );

    //console.log(product_name);
    // check product name
    if (product_name.length !== 0) {
      if (path !== '') {
        deleteImg(path);
      }
      return res.send({
        message: 'សុំអភ័យទោស! ឈ្មោះផលិតផលមានរួចហើយ...!',
        success: false,
      });
    }

    // get product code
    const [product_code] = await Product.findProductCode(req.body.product_code);
    //console.log(product_code);

    // check if product code already exist
    if (product_code.length !== 0) {
      if (path !== '') {
        deleteImg(path);
      }
      return res.send({ message: 'សុំអភ័យទោស! កូដផលិតផលមានរួចហើយ...!' });
    }

    //console.log(path);

    let product = new Product(
      req.body.category_id,
      req.body.brand_id,
      req.body.sub_id,
      req.body.unit_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.unit_price,
      req.body.price,
      expDate,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number
    );

    product = await product.save();
    //console.log(product);

    if (product[0].affectedRows !== 0) {
      res.send({ message: 'ផលិតផលត្រូវបានបង្កើតដោយជោគជ័យ!', success: true });
    } else {
      if (path !== '') {
        deleteImg(path);
      }
      res.send({ message: 'បរាជ័យ', success: false });
    }
  } catch (err) {
    next();
  }
};

exports.uppdateProduct = async (req, res, next) => {
  try {
    let expDate = req.body.exp_date;
    if (expDate === '') {
      expDate = null;
    }
    let path = '';

    const categoryId = req.body.category_id || 0;
    const product_name = req.body.product_name || '';
    const product_code = req.body.product_code || '';
    const unit_price = req.body.unit_price || 0;
    const price = req.body.price || 0;
    const unit = req.body.unit_id || 0;
    const qty = req.body.qty || 0;

    if (categoryId === '' || categoryId === 0) {
      return res.send({ message: 'សូម! ជ្រើសរើសក្រុមផលិតផល', success: false });
    }

    if (product_name === '') {
      return res.send({ message: 'សូម! បញ្ចូលឈ្មោះផលិតផល', success: false });
    }

    if (product_code === '') {
      return res.send({ message: 'សូម! បញ្ចូលកូដផលិតផល', success: false });
    }

    if (unit_price === 0 || unit_price === '') {
      return res.send({ message: 'សូម! បញ្ចូលតម្លៃដើម', success: false });
    }

    if (price === '' || price === 0) {
      return res.send({ message: 'សូម! សូមបញ្ចូលតម្លៃលក់ចេញ', success: false });
    }

    if (unit == 0 || unit === '') {
      return res.send({ message: 'សូម! ជ្រើសរើសឯកតា', success: false });
    }
    if (qty === 0 || qty === '') {
      return res.send({ message: 'សូម! បញ្ចូលបរមាណផលិតផល', success: false });
    }

    // get path of image
    const [oldPath] = await Product.findImageById(req.params.product_id);
    
    if (req.file) {
      path = req.file.path;
    } else {
      path = oldPath[0].product_image;
    }

    // check duplicate by name
    const [pro_name] = await Product.findDuplicateByName(
      req.params.product_id,
      req.body.product_name
    );
    if (pro_name.length !== 0) {
      if (req.file) {
        //deleteImg(path);
      }
      return res.send({
        message: 'សុំអភ័យទោស! ឈ្មោះផលិតផលមានរួចហើយ...!',
        success: false,
      });
    }

    // check duplicate product code
    const [pro] = await Product.findDuplicateByProductCode(
      req.params.product_id,
      req.body.product_code
    );
    if (pro.length !== 0) {
      if (req.file) {
        //deleteImg(path);
      }
      return res.send({
        message: 'សុំអភ័យទោស! កូដផលិតផលមានរួចហើយ...!',
        success: false,
      });
    }

    const [result] = await Product.updateProductById(
      req.body.category_id,
      req.body.brand_id,
      req.body.unit_id,
      req.body.sub_id,
      req.body.product_code,
      req.body.product_name,
      req.body.qty,
      req.body.unit_price,
      req.body.price,
      expDate,
      path,
      req.body.desc,
      req.body.status,
      req.body.reorder_number,
      req.params.product_id
    );

    if (result.affectedRows !== 0) {
      if (req.file) {
        // await deleteImg(oldPath[0].product_image);
      }

      res.send({ message: 'ការប្រែជោគជ័យ...!', success: true });
    } else {
      res.send({ message: 'ការប្រែបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    //console.log(req.query);
    // get number of row
    const [nRows] = await Product.pagination(search);

    const totalPage = Math.ceil(nRows[0][0].TotalRows / limit);

    const [result] = await Product.searchProduct(search, limit, page);

    //const [products] = await Product.findAllProduct();

    result[0].map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });

    res.send({
      result: result[0],
      page: page,
      limit: limit,
      totalRows: nRows[0][0],
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.findImgById = async (req, res, next) => {
  try {
    const [image] = await Product.findImageById(req.params.product_id);
    if (image.length !== 0) {
      // console.log(image[0]);
      res.send(image);
    } else {
      res.send({ message: "មិនមានរូបភាព...!" });
    }
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // get path of image
    const [path] = await Product.findImageById(req.params.product_id);

    const [result] = await Product.deleteById(req.params.product_id);

    if (result.affectedRows !== 0) {
      //deleteImg(path[0].product_image);
      res.send({ message: 'លុបផលិតផលត្រូវបានជោគជ៏យ...!', success: true });
    } else {
      res.send({ message: 'លុបផលិតផលត្រូវបានបរាជ័យ...!', success: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteImageOne = async (req, res, next) => {
  try {
    // get path of image
    const [path] = await Product.findImageById(req.params.product_id);

    const [result] = await Product.deleteImageById(req.params.product_id);
    if (result.affectedRows !== 0) {
      //deleteImg(path[0].product_image);
      res.end();
    }
  } catch {
    next();
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const [product] = await Product.findProductById(req.params.product_id);
    res.send(product);
  } catch (err) {
    next(err);
  }
};

exports.queryProductByName = async (req, res, next) => {
  if (!req.query.q) {
    return res.end();
  }
  //console.log(req.query);
  try {
    const [product] = await Product.findProductByName(req.query.q);
    //console.log(product);
    if (product.length !== 0) {
      res.send({
        message: 'ផលិតផលមាននៅក្នុងប្រព័ន្ធរួចរាល់ហើយ!',
        success: false,
      });
    } else {
      res.send({ message: '', success: true });
    }
  } catch (err) {
    next(err);
  }
};

exports.queryProductByProductCode = async (req, res, next) => {
  if (!req.query.q) {
    return;
  }
  try {
    const [product] = await Product.findProductCode(req.query.q);
    if (product.length !== 0) {
      res.send({
        message: 'កូដផលិតផលមានរួចហើយ.សូម! សាកល្បងម្តងទៀត...!',
        success: false,
      });
    } else {
      res.send({ message: '', success: true });
    }
  } catch (err) {
    next(err);
  }
};

// encode image to base64
function base64_encode(file) {
  try {
    return 'data:image/png;base64,' + fs.readFileSync(file, 'base64');
  } catch (err) {}
}

exports.productCard = async (req, res, next) => {
  try {
    const [proCard] = await Product.productCard();

    proCard.map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(proCard);
  } catch (err) {
    next(err);
  }
};

exports.findByProcode = async (req, res, next) => {
  try {
    //console.log(req.body);
    const [product] = await Product.findByProcode(req.params.productcode);

    product.map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(product);
  } catch (err) {
    next(err);
  }
};

exports.ProductReports = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.query.categoryId || 0);
    const limit = req.query.limits || 10;
    const page = req.query.page || 1;
    const search = req.query.search || '';

    const [nRows] = await Product.RowsProductReports(search);
    const totalPage = Math.ceil(nRows[0][0].TotalRows / limit);

    //console.log(req.query);
    if (categoryId === 0) {
      const [result] = await Product.productReports(limit, page, search);
      res.send({
        result: result[0],
        limit: limit,
        page: page,
        totalRows: nRows[0][0],
        totalPage: totalPage,
      });
    } else {
      const [result] = await Product.findProductRportByCategory(
        limit,
        page,
        categoryId,
        search
      );
      res.send({
        result: result[0],
        limit: limit,
        page: page,
        totalRows: nRows[0][0],
        totalPage: totalPage,
      });
    }
    // const [result] = await Product.productReports();
    // res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.findProductByNameAndCode = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const [result] = await Product.findProductCardByNameAndCode(search);
    result[0].map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
};

// redorder
exports.reorder_msg = async (req, res, next) => {
  try {
    const [result] = await Product.ReorderMsg();
    result.map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

// out of stock
exports.OutOfStockMsg = async (req, res, next) => {
  try {
    const [result] = await Product.OutOfStockMsg();
    result.map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.itemsCount = async (req, res, next) => {
  try {
    const [result] = await Product.CountItems();

    res.send({
      ...result[0][0],
      ...result[1][0],
      ...result[2][0],
      ...result[3][0],
    });
  } catch (err) {
    next(err);
  }
};

exports.viewById = async (req, res, next) => {
  try {
    const id = req.params.id || 0;
    if (id === 0 || id === '') {
      return res.send({ message: 'Product not found...', success: false });
    }
    const [result] = await Product.ViewProductById(id);
    result[0].map((item) => {
      if (item.product_image !== '') {
        // console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode('./' + item.product_image);
      }
    });
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
};

exports.stock_reports = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;
    const keyword = req.query.search || '';
    const qty = req.query.qty || 0;
    const page = req.query.page || 1;

    const [nRows] = await Product.rowStockReports(qty, keyword);
    const totalPage = Math.ceil(nRows[0][0].totalRows / limit);
    //console.log(nRows[0]);

    const [result] = await Product.stockReport(limit, qty, keyword, page);
    res.send({
      result: result[0],
      limit: limit,
      page: page,
      totalRows: nRows[0][0].totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};
