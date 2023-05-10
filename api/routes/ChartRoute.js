const express = require('express');
const Chart = require('../controllers/ChartControllers');
const route = express.Router();

route.get('/api/days_chart', Chart.chartDayAmount);

module.exports = route;
