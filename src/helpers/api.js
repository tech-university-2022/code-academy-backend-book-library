const axios = require('axios');

async function callExternalApi(path) {
  const res = await axios.get(`${process.env.API_URL}${path}`);
  return res.data;
}

module.exports = callExternalApi;
