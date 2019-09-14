const fs = require('fs');
const path = require('path');

const sendMetadata = (req, res) => {
  const files = req.files[0];
  const response = {
    name: files.originalname,
    type: files.mimetype,
    size: files.size
  }
  res.send(response);  
}

module.exports = {sendMetadata};