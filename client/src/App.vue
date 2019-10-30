<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      getToken: process.env.GET_TOKEN
    }
  },
  mounted () {
    if (this.getToken) {
      this.$store.dispatch('richMenu/getToken')
    }
  }
}
</script>
