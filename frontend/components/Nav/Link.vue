<template>
  <nuxt-link
    class="p-5 text-xl hover:scale-110 transition-all ease-out text-center"
    :to="to"
    @click.native="$nuxt.$emit('check-burger', false)"
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

<style>
.nuxt-link-exact-active {
  color: #eab308;
}
</style>
