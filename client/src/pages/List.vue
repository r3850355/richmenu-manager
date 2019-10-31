<template>
  <q-page class="q-pa-lg bg-grey-4">
    <div class="row items-start q-gutter-md " style="justify-content:center;">
      <q-card class="my-card" v-for="menu in list" :key="menu.richMenuId" >
        <div>
          <q-card-section>
            <q-icon name="web" style="font-size: 24px;"></q-icon>
            <q-chip color="yellow-10" text-color="white" icon="star" label="預設" dense v-if="menu.default"/>
            <b class="q-ml-sm">{{ menu.name}}</b>
          </q-card-section>
          <q-separator color="faded" inset />
          <q-card-section style="display:flex;align-items:center;justify-content:center;height: 280px">
            <q-img
              :src="api_url + menu.image"
              v-if="menu.image"
            >
            </q-img>
            <div class="text-center" v-else>
              <p>此 RichMenu 沒有圖片</p>
              <q-btn @click="imageUploadDialog = true; targetMenu = menu">上傳圖片</q-btn>
            </div>
            <!-- <div style="position:absolute; top:220px; background: rgba(0,0,0,0.7); width: 100%; height: 60px;text-align: center">
              <div style="color:#fff; margin-top:18px; font-weight: 800">
                {{ menu.name}}
                <br>
                <p style="font-weight: 300">{{ menu.richMenuId }}</p>
              </div>
            </div> -->
          </q-card-section>
          <q-card-section >
            <div class="row">
              <q-btn class="col-4" flat icon="code" @click="jsonDialog = true; targetMenu = menu">查看JSON</q-btn>
              <q-btn class="col-4" flat icon="star_border" v-if="!menu.default" @click="setDefault(menu)">設為預設</q-btn>
              <q-btn class="col-4" flat icon="star" @click="cancelDefault" v-else>取消預設</q-btn>
              <q-btn class="col-4" flat icon="delete" color="red" @click="deleteRichMenu(menu)">刪除</q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
      <div v-if="listSize === 0">
        <h6>你還沒有半個RichMenu，快從左邊選單建立一個吧！</h6>
      </div>
      <!-- <vue-context ref="menu">
        <li>
            <a @click="jsonDialog = true">查看JSON</a>
        </li>
        <li v-if="!targetMenu.image">
            <a @click="imageUploadDialog = true">上傳圖片</a>
        </li>
        <li>
            <a @click="setDefault">設為預設</a>
        </li>
        <li>
            <a @click="deleteRichMenu" style="color: red;">刪除</a>
        </li>
      </vue-context> -->
      <!-- SHOW JSON DIALOG -->
      <q-dialog v-model="jsonDialog">
        <q-card>
          <q-card-section>
            <vue-json-pretty
              :path="'res'"
              :data="json"
            >
            </vue-json-pretty>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- UPLOAD IMAGE DIALOG -->
      <q-dialog v-model="imageUploadDialog">
        <q-card>
          <q-card-section>
            <p>檔案大小限制： 1MB</p>
            <p>圖片格式限制： JPEG、PNG</p>
            <p>圖片尺寸： 2500x1686, 2500x843, 1200x810, <br> 1200x405, 800x540, 800x270</p>
            <div style="text-align:center">
              <q-uploader
                label="點擊旁邊按鈕選取圖片"
                auto-upload
                :url="`${api_url}/api/upload`"
                :max-file-size="1048576"
                accept=".jpg, image/*"
                :headers="[{name: 'X-richMenu-ID', value: targetMenu.richMenuId }, {name: 'token', value: $store.state.richMenu.accessToken }]"
                @uploaded="uploaded"
                @failed="uploadFailed"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
// import { VueContext } from 'vue-context'
import VueJsonPretty from 'vue-json-pretty'
import _ from 'lodash'
export default {
  name: 'PageIndex',
  components: {
    VueJsonPretty
  },
  data () {
    return {
      targetMenu: {},
      jsonDialog: false,
      imageUploadDialog: false,
      api_url: process.env.API_URL
    }
  },
  methods: {
    uploaded (info) {
      setTimeout(() => {
        this.$store.dispatch('richMenu/getList')
        this.imageUploadDialog = false
      }, 1000)
    },
    uploadFailed () {
      this.$q.notify({
        message: '圖片格式或大小有誤',
        color: 'red',
        timeout: 3000
      })
    },
    deleteRichMenu (menu) {
      this.$q.dialog({
        title: '注意',
        message: '確定刪除此 RichMenu，刪除後無法復原',
        cancel: '取消',
        ok: '刪除'
      }).onOk(() => {
        // 刪除
        this.$store.dispatch('richMenu/postDelete', { id: menu.richMenuId }).then(() => {
          this.$q.notify({
            message: '刪除成功囉',
            color: 'info',
            timeout: 2000
          })
          this.$store.dispatch('richMenu/getList')
        }).catch(() => {
          this.$q.notify({
            message: '刪除失敗了',
            color: 'warning',
            timeout: 2000
          })
        })
      })
    },
    setDefault (menu) {
      this.$q.dialog({
        title: '注意',
        message: '確定將此 RichMenu 設為預設？',
        cancel: '取消',
        ok: '確定'
      }).onOk(() => {
        this.$store.dispatch('richMenu/postDefault', { id: menu.richMenuId }).then(() => {
          this.$store.dispatch('richMenu/getList')
          this.$q.notify({
            message: '設為預設囉!',
            color: 'info',
            timeout: 2000
          })
        }).catch(() => {
          this.$q.notify({
            message: '設置失敗了',
            color: 'warning',
            timeout: 2000
          })
        })
      })
    },
    cancelDefault () {
      this.$q.dialog({
        title: '注意',
        message: '確定要取消預設? 取消後用會端將不會顯示任何RichMenu',
        cancel: '取消',
        ok: '確定'
      }).onOk(() => {
        this.$store.dispatch('richMenu/cancelDefault').then(() => {
          this.$store.dispatch('richMenu/getList')
          this.$q.notify({
            message: '已經取消預設囉!',
            color: 'info',
            timeout: 2000
          })
        }).catch(() => {
          this.$q.notify({
            message: '設置失敗了',
            color: 'warning',
            timeout: 2000
          })
        })
      })
    }
  },
  computed: {
    listSize () {
      return _.size(this.$store.state.richMenu.list)
    },
    list () {
      return this.$store.state.richMenu.list
    },
    json () {
      let res = Object.assign({}, this.targetMenu)
      delete res['image']
      delete res['default']
      return res
    }
  },
  mounted () {
    if (this.$store.state.richMenu.isLoad === false) { this.$router.push('/search') }
  }
}
</script>

<style lang="stylus">
@import '~vue-context/dist/css/vue-context.css'
.my-card {
  width 400px
}
</style>
