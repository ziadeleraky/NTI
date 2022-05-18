const https = require('https');

const api = (url, cb) => {
  const req = https.request(url, (res) => {
    let result = ''
    res.on('data', (x) => {
      result += x.toString(); // response will be on many parts so we add them all into variable so we can parse it successfully
    })
    res.on('end', () => {
      cb(JSON.parse(result), false)
    })
  })
  req.on('error', (err) => cb(false, err))
  req.end()
}


module.exports = {
  api
};