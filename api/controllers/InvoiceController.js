const Invoice = require('../models/InvoiceModel');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const send_message = (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const bot = new TelegramBot(token, { polling: true });
    bot.sendMessage(chatId, message);
  } catch (err) {}
};

module.exports.create = async (req, res, next) => {
  try {
    let invoice = new Invoice(
      req.body.payment_id,
      req.body.amount,
      req.body.remain
    );

    [invoice] = await invoice.save();
    const [invoice_number] = await Invoice.generateInvoiceNumber(
      invoice.insertId
    );
    res.send({ id: invoice.insertId });
  } catch (err) {
    next(err);
  }
};

module.exports.saleInvoice = async (req, res, next) => {
  try {
    const [invoice] = await Invoice.saleInvoice(req.params.id);

    // ========= send message to telegram ==========

    let text = '';
    let saller = '';
    let total = 0;
    let payment = '';
    let amount = 0;
    let moneyChange = 0;
    let invoiceNumber = '';

    invoice[0].map((item) => {
      total += item.subtotal;
      invoiceNumber = item.invoice_number;
      saller =
        'អ្នកលក់: ' +
        item.username +
        '\nលេខវិក័យប័ត្រ: ' +
        invoiceNumber +
        '\nកាលបរិច្ឆេទ: ' +
        item.sale_date +
        '\n\n';

      payment = 'បង់ដោយ: ' + item.payment_type;
      amount = '\nប្រាក់បានបង់: $' + item.amount + '.00';
      moneyChange = '\nប្រាប់អាប់: $' + item.money_change + '.00';
      text +=
        'ឈ្មោះផលិតផល : ' +
        item.product_name +
        ' ' +
        '\nចំនួន: ' +
        item.qty +
        ' ' +
        '\nតម្លៃ: $' +
        item.subtotal +
        '.00' +
        '\n' +
        '---------------------\n';
    });
    if (text !== '' && saller !== '' && total !== 0) {
      send_message(
        saller +
          text +
          'ប្រាក់សរុប: $' +
          total +
          '.00\n' +
          payment +
          amount +
          moneyChange
      );
    }
    // ========= end of message =============

    // ====== send invoice to user ==========
    //console.log(invoice);
    res.send(invoice);
  } catch (err) {
    next(err);
  }
};

module.exports.view_invoice = async (req, res, next) => {
  try {
    const [invoice] = await Invoice.saleInvoice(req.params.id);
    res.send(invoice);
  } catch (err) {
    next(err);
  }
};

module.exports.update_invoice = async (req, res, next) => {
  try {
    //console.log(req.body);
    const id = req.params.id;
    const amount = req.body.amount;
    const money_change = req.body.remain;
    const payment_id = req.body.payment_id;

    const [result] = await Invoice.updateInvoice(
      id,
      payment_id,
      amount,
      money_change
    );

    if (result.affectedRows > 0) {
      res.send({ message: 'បានធ្វើការផ្លាស់ប្ដូរ...!', success: true });
    } else {
      res.send({ message: 'បរាជ៏យ...!', success: true });
    }
  } catch (err) {
    next(err);
  }
};
