const Statement = require('../models/Statements');
const error = {success: false, error: 'Server Error'}

exports.getStatements = async (req, res, next) => {
  
  let startTime = performance.now()
  try {
    let date = req.params.date;
    
    if(!isDate(date)) date = new Date();
    else date = new Date(date);

    // let copyOfDate = new Date(date.valueOf())

    // let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    // console.log(lastDayOfMonth, lastDayOfMonth.getDay());
    let month = date.getMonth();
    let year = date.getFullYear();
    let lastDays = lastDay(year,month);
    // console.log([year, month-1,31]);

    const statements = await Statement.find(
      {
        date: {
            $gte: new Date(year, month, 1), 
            $lt: new Date(year, month, lastDays)
        }
    }
    );
    let endTime = performance.now()
    return res.status(200).json({
      success: true,
      count: statements.length,
      data: statements,
      time: endTime - startTime
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(error);
  }
}

exports.getTotal = async (req, res, next) => {
  let startTime = performance.now()
  try {
    // console.log('here');
    const statements = await Statement.find();
    // console.log(statements);
    let endTime = performance.now()
    return res.status(200).json({
      success: true,
      count: statements.length,
      data: statements,
      time: endTime - startTime
    });
  } catch (err) {
    return res.status(500).json(error);
  }
}

exports.deleteStatements = async (req, res, next) => {
  let startTime = performance.now()
  try {
    const statement = await Statement.findById(req.params.id);
    // console.log(statement);
    if(!statement) {
      return res.status(404).json({
        success: false,
        error: 'No statement found'
      });
    }

    // console.log(statement);
    await statement.remove();
    let endTime = performance.now()
    return res.status(200).json({
      success: true,
      data: {},
      time: endTime - startTime
    });

  } catch (err) {
    return res.status(500).json(error);
  }
}

exports.addStatements = async (req, res, next) => {
  let startTime = performance.now()
  try {
    const { text, amount } = req.body;
    //todo validate text and amount and date!
    const statement = await Statement.create(req.body);
    let endTime = performance.now()
    return res.status(200).json({
      success: true,
      data: statement,
      time: endTime - startTime
    }); 
  } catch (err) {
    return res.status(500).json(error);
  }
}
function isDate(date) {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}
function lastDay(y,m){
  return  new Date(y, m +1, 0).getDate();
  }