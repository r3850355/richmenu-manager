<template>
  <q-page class="flex flex-center bg-grey-4">
    <div class="row bg-white" style="width:90%;">
      <div class="col-sm-12 col-md-6 q-pa-md">
        <q-input
        label="在此貼上JSON"
        v-model="menuJsonText"
        :error="menuJsonTextError"
        error-message="JSON格式有誤"
        outlined
        ref="inputColumn"
        ></q-input>
        <VuePerfectScrollbar class="scroll-area" :settings="settings" v-bind:style="{ 'width': inputWidth + 'px' }">
          <vue-json-pretty
            :path="'res'"
            :data="menuJSON"
          >
          </vue-json-pretty>
        </VuePerfectScrollbar>
      </div>
      <div class="col-sm-12 col-md-6 q-pa-md q-gutter-md">
        <q-input label="名稱" filled :value="menuJSON.name" @change="el => { editJSON('name', el) }"></q-input>
        <q-input label="聊天列標題" filled :value="menuJSON.chatBarText" @change="el => { editJSON('chatBarText', el) }"></q-input>
        <q-checkbox :value="menuJSON.selected" label="自動設為預設" @input="el => { editJSON('selected', el) }"/>
        <div class="row">
          <div class="col-6"><q-input label="寬" outlined :value="menuJSON.size.width" readonly></q-input></div>
          <div class="col-6"><q-input label="高" outlined :value="menuJSON.size.height" readonly></q-input></div>
        </div>
        <q-input label="已設置的區塊" outlined :value="size(menuJSON.areas)" readonly></q-input>
        <div class="text-center">
          <q-btn @click="postCreate">新增 RichMenu</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import _ from 'lodash'
import VueJsonPretty from 'vue-json-pretty'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: {
    VueJsonPretty,
    VuePerfectScrollbar
  },
  data () {
    return {
      menuJsonText: '',
      menuJsonTextError: false,
      settings: {
        maxScrollbarLength: 60
      },
      inputWidth: 300
    }
  },
  methods: {
    size  (val) {
      return _.size(val)
    },
    editJSON (type, el) {
      // console.log(el.target.value)
      // console.log(this.$refs.inputColumn)
      let json = JSON.parse(this.menuJsonText)
      if (type === 'selected') {
        // console.log(json[type])
        json[type] = !json[type]
      } else {
        json[type] = el.target.value
      }
      this.menuJsonText = JSON.stringify(json)
    },
    postCreate () {
      this.$store.dispatch('richMenu/postCreate', this.menuJSON).then(() => {
        this.$q.notify({
          message: '新增成功了',
          color: 'info',
          timeout: 2000
        })
        this.$store.dispatch('richMenu/getList')
        this.$router.push('/list')
      }).catch(() => {
        this.$q.notify({
          message: '新增失敗了',
          color: 'warning',
          timeout: 2000
        })
      })
    }
  },
  computed: {
    menuJSON () {
      let vm = this
      if (this.menuJsonText) {
        try {
          let parse = JSON.parse(this.menuJsonText)
          if (!parse.size.height) { throw new Error() }
          if (!parse.size.width) { throw new Error() }
          if (!parse.name) { throw new Error() }
          if (!parse.chatBarText) { throw new Error() }
          // if (!parse.area) { throw new Error() }
          vm.menuJsonTextError = false
          return parse
        } catch (e) {
          vm.menuJsonTextError = true
          return {
            name: '',
            selected: false,
            chatBarText: '',
            size: {
              width: 0,
              height: 0
            }
          }
        }
      } else {
        return {
          name: '',
          selected: false,
          chatBarText: '',
          size: {
            width: 0,
            height: 0
          }
        }
      }
    }
  },
  mounted () {
    this.inputWidth = this.$refs.inputColumn.$el.clientWidth
  }
}
</script>

<style lang="scss">
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 600px;
  border: 1px #ccc solid;
  border-radius: 5px;
  padding: 10px;
}
</style>
