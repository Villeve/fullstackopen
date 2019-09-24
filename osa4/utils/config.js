require('dotenv').config();

const { PORT } = process.env;
let { MONGOURL } = process.env;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  MONGOURL = process.env.TEST_MONGOURL
}

module.exports = {
  PORT,
  MONGOURL,
};
