<template>
  <div class="q-pa-md q-gutter-sm">
    {{ value }}
    <q-btn label="Alert" color="primary" @click="alert" />
    <q-btn label="Confirm" color="primary" @click="confirm" />
    <q-btn label="Prompt" color="primary" @click="prompt" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object],
      default: {}
    }
  }
}
</script>
