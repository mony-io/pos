const chartModel = require('../models/ChartModel');

module.exports.chartDayAmount = async (req, res, next) => {
  try {
    let data = [
      {
        day: 'Mon',
        totalAmount: 0,
      },
      {
        day: 'Tue',
        totalAmount: 0,
      },
      {
        day: 'Wed',
        totalAmount: 0,
      },
      {
        day: 'Thu',
        totalAmount: 0,
      },
      {
        day: 'Fri',
        totalAmount: 0,
      },
      {
        day: 'Sat',
        totalAmount: 0,
      },
      {
        day: 'Sun',
        totalAmount: 0,
      },
    ];
    //console.log(data);
    const [result] = await chartModel.daysChartData();

    result.map((item) => {
      data.map((days) => {
        if (item.Day === days.day) {
          days.totalAmount = item.totalAmount;
        }
      });
    });
    res.send(data);
  } catch (err) {
    next(err);
  }
};
