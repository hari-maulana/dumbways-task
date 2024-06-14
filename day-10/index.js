const express = require('express')
const app = express()
const port = 3000;

app.get('/', function (req, res) {
  res.send('<h2>Nama saya Gendeng Kebo hh</h2>')
})

app.listen(port, () => {
    console.log(`server berjalan pada port: ${port}`);
});