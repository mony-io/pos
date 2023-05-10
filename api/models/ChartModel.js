const db = require('../config/db');

class Chart {
  static daysChartData() {
    const sql = 'SELECT *FROM V_ChartDayReports';
    return db.execute(sql);
  }
}

module.exports = Chart;
