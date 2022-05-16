const express = require('express');
const cors = require('cors')
const multer = require("multer");
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}`)
  }
})

const upload = multer({ storage: storage });

app.get('/', function(req, res) {
    res.status(200).send('sdssd');
});

app.post('/upload', upload.single('myaudio.wav') ,function(req, res) {
  res.json({ message: "Successfully uploaded files" });
});

app.post('/upload-photo', upload.single('myphoto.png') ,function(req, res) {
  res.json({ message: "Successfully uploaded file" });
});

app.get('/audio', function(req, res) {
  res.status(200).sendFile(path.join(__dirname, 'files/myaudio.wav'));
});

app.get('/photo', function(req, res) {
  res.status(200).sendFile(path.join(__dirname, 'files/myphoto.png'));
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});