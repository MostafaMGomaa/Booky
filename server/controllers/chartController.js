const Chart = require('../models/chartModel');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');

exports.getAllCharts = getAll(Chart);
exports.getChart = getOne(Chart);
exports.createChart = createOne(Chart);
exports.updateChart = updateOne(Chart);
exports.deleteChart = deleteOne(Chart);
