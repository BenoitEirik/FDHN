<template>
  <nuxt-link
    class="m-6 p-6 max-w-xs w-48 rounded card-shadow bg-white text-center text-xl"
    :to="to"
  >
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.card-shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
