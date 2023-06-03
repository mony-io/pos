const SaleDetail = require("../models/SaleDetailModel");
const fs = require("fs");

module.exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    let sale_details = new SaleDetail(req.body);
    sale_details = await sale_details.save();
    res.send({ message: "បានកត់សម្គាល់...!", success: true });
  } catch (err) {
    next(err);
  }
};

// encode image to base64
function base64_encode(file) {
  try {
    return "data:image/png;base64," + fs.readFileSync(file, "base64");
  } catch (err) {}
}

module.exports.fetchSaleProductsById = async (req, res, next) => {
  try {
    const [result] = await SaleDetail.fetchSaleProduct(req.params.id);
    result[0].map((item) => {
      if (item.product_image !== "") {
        //console.log("./" + item.product_image);
        //console.log(base64_encode("./" + item.product_image));
        item.product_image = base64_encode("./" + item.product_image);
      }
    });
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSaleDetails = async (req, res, next) => {
  try {
    const data = req.body;
    const sale_id = req.params.id;
    const [result] = await SaleDetail.deleteSaleDetails(sale_id);
    if (result.affectedRows === 0) {
      return res.end();
    }

    let sale_details = new SaleDetail(data);
    sale_details = await sale_details.save();

    res.send({ message: "បានកត់សម្គាល់...!", success: true });
  } catch (err) {
    next(err);
  }
};

// module.exports = async (req, res, next) => {
//   try {
//     const data = req.body;

//     data.map(async (data) => {
//       const [res] = await SaleDetail.updateSaleQty(
//         data.qty,
//         data.sale_id,
//         data.product_id
//       );
//     });

//     res.send("success")
//   } catch (err) {
//     next(err);
//   }
// };
