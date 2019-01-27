const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

axios.defaults.headers.post['Content-Type'] = 'application/json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});


app.get('/blockchain/blocks',(req, res) => {
  axios.get('http://localhost:4001/blocks')
      .then(response => {
        res.send(response.data)
      })
      .catch(error => {console.log('error: '+error)})
});


// Blockchain call for adding new block
app.post('/blockchain/mineBlock',(req,res)=>{
  // port 4001 runs the http api for the blockchain component.
  axios.post('http://localhost:4001/mineBlock',{
    data: req.body.data
  }).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.log('error: '+ error);
  });
  res.json({msg: "Block Added!"})
});



app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
