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
  const form = new formidable.IncomingForm()
  form.uploadDir = 'public/upload'
  form.parse(req)
  .on('file', (name, file) => {
    // console.log(file.path)
    richMenu.uploadRichMenuImage(req.header('X-richMenu-ID'), file.path).then(() => {
      res.send('ok')
    }).catch(() => {
      // 123
    })
  })
  .on('error', (err) => {
    console.error('Error', err)
    throw err
  })
  
  res.send('Thank you')
})

module.exports = router