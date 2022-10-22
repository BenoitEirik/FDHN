<template>
  <nuxt-link
    ref="myLink"
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
  },
  mounted () {
    if (this.name.includes('don')) {
      this.$refs.myLink.$el.classList.add('decorated')
    }
  }
}
</script>

<style scoped>
.nuxt-link-exact-active {
  color: #eab308;
}
.decorated {
  text-decoration: underline;
  text-decoration-color: #eab308;
  text-decoration-thickness: 3px;
}
</style>
