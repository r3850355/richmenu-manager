<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <q-input outlined label="Channel Access Token" class="searchInput" v-model="token" :error="tokenError"></q-input>
      <q-btn class="q-mt-md" @click="getList()">列出所有的 RichMenu</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      token: this.$store.state.richMenu.accessToken,
      tokenError: false
    }
  },
  methods: {
    getList () {
      this.tokenError = false
      if (this.token) {
        this.$store.dispatch('richMenu/getList', this.token).then(() => {
          this.$router.push('/list')
        }).catch(() => {
          this.$q.notify({
            message: '找不到對應的資料，請檢查Token是否正確',
            color: 'red',
            timeout: 3000
          })
        })
      } else {
        this.tokenError = true
      }
    }
  }
}
</script>

<style lang="stylus">
  @media (min-width: 0px)
    .searchInput
      width 300px
  @media (min-width: 599px)
    .searchInput
      width 500px
  @media (min-width: 1439px)
    .searchInput
      width 600px
</style>
