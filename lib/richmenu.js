const axios = require('axios')
const _ = require('lodash')
const fs = require('fs')



class richmenu {
  constructor (token) {
    this.axios = axios.create({ headers: { 'Authorization': 'Bearer ' + token}})
  }

  getRichMenuList () {
    return new Promise((reslove, reject) => {
      this.axios.get('https://api.line.me/v2/bot/richmenu/list').then(res => {
        let richmenus = res.data.richmenus
        let promiseArr = []
        if ( _.size(richmenus) > 0) {
          // 找預設
          promiseArr.push(
            this.getDefaultRichMenuId().then(id => {
              _.find(richmenus, fn => { return fn.richMenuId === id})['default'] = true
            })
          )
          // ˊ下載圖片
          _.each(richmenus, el => {
            promiseArr.push(
              this.getRichMenuImage(el.richMenuId).then(async image => {
                el['image'] = image
              }).catch(err => {
                el['image'] = null
              })
            )
          })
          Promise.all(promiseArr).then(() => {
            reslove(richmenus)
          })
        }
      }).catch(err => {
        // console.log(err)
        reject()
      })
    })
  }

  getRichMenuImage (richMenuId) {
    return new Promise((resolve, reject) => {
      this.axios.get(`https://api.line.me/v2/bot/richmenu/${richMenuId}/content`, { responseType: 'stream' }).then(res => {
        const file = fs.createWriteStream(`public/images/${richMenuId}.png`)
        let stream = res.data.pipe(file)
        stream.on('finish', () => {
          resolve(`http://localhost:3030/public/images/${richMenuId}.png`)
        })
      }).catch(err => {
        // console.log(err)
        reject(err)
      })
    })
  }

  getDefaultRichMenuId () {
    return new Promise((resolve, reject) => {
      this.axios.get('https://api.line.me/v2/bot/user/all/richmenu').then(res => {
        resolve(res.data.richMenuId)
      }).catch(err => {
        console.log(err.response.data)
        reject()
      })
    })
  }

  uploadRichMenuImage (richMenuId, path) {
    return new Promise((resolve, reject) => {
      let vm = this
      fs.readFile(path, function (err, image) {
        if (err) {
          throw err
        }
        vm.axios.post(`https://api.line.me/v2/bot/richmenu/${richMenuId}/content`, image, { headers: { 'Content-Type': 'image/png' }}).then(res => {
          if (_.size(res.data) === 0) {
            resolve()
          }
        }).catch(() => {
          reject()
        })
      })
    })
  }

  deleteRichMenu (richMenuId) {
    return new Promise((resolve, reject) => {
      this.axios.delete(`https://api.line.me/v2/bot/richmenu/${richMenuId}`).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  }

  createRichMenu (data) {
    return new Promise((resolve, reject) => {
      this.axios.post(`https://api.line.me/v2/bot/richmenu`, data).then(() => {
        resolve()
      }).catch(err => {
        console.log(err.response.data)
        reject()
      })
    })
  }

  setDefaultRichMenu (richMenuId) {
    return new Promise((resolve, reject) => {
      this.axios.post(`https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`, richMenuId).then(() => {
        resolve()
      }).catch(err => {
        console.log(err.response.data)
        reject()
      })
    })
  }
}

module.exports = richmenu