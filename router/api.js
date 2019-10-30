const express = require('express')
const RichMenu = require('../lib/richmenu')
const cors = require('cors')
const fs = require('fs')
const formidable = require('formidable')
const router = express.Router()

router.use(cors())

router.get('/token', (req, res) => {
  res.send(process.env.CHANNEL_ACCESS_TOKEN)
})

router.get('/list', (req, res) => {
  const richMenu = new RichMenu(req.header('token'))
  richMenu.getRichMenuList().then(data => {
    res.send(data)
  }).catch(() => {
    res.send('error')
  })
})

router.post('/delete', (req, res) => {
  const richMenu = new RichMenu(req.header('token'))
  richMenu.deleteRichMenu(req.body.id).then(() => {
    res.send('ok')
  }).catch(() => {
    res.send('error')
  })
})

router.post('/create', (req, res) => {
  const richMenu = new RichMenu(req.header('token'))
  richMenu.createRichMenu(req.body).then(() => {
    res.send('ok')
  }).catch(() => {
    res.send('error')
  })
})

router.post('/default', (req, res) => {
  const richMenu = new RichMenu(req.header('token'))
  richMenu.setDefaultRichMenu(req.body.id).then(() => {
    res.send('ok')
  }).catch(err => {
    console.log(err)
    res.send('error')
  })
})

router.post('/upload', (req, res) => {
  const richMenu = new RichMenu(req.header('token'))
  var form = new formidable.IncomingForm()
  form.uploadDir = 'public/upload'

  form.on('error', (err) => {
    console.error('上傳圖片發生錯誤', err)
    throw err
  })
  form.onPart = function(part) {
    form.handlePart(part)
  }
  form.on('file', function (name, file) {
    console.log('上傳的檔案，儲存於：' + file.path)
    richMenu.uploadRichMenuImage(req.header('X-richMenu-ID'), file.path).then(() => {
      res.send('ok')
    }).catch(() => {
      res.status(403)
    })
  });
  form.parse(req)
  
})

module.exports = router