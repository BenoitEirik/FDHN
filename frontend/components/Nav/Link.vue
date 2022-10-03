<template>
  <nuxt-link class="p-5 text-2xl hover:scale-110 duration-150" :to="to">
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

<style>
.nuxt-link-exact-active {
  color: #FFB200;
}
</style>
