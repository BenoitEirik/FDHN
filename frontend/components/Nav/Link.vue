<template>
  <nuxt-link :class="(drop ? 'opacity-on':'opacity-off') + ' p-5 text-xl hover:scale-110 transition-all ease-out text-center'" :to="to">
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
    },
    drop: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  color: #eab308;
}
.opacity-on {
  opacity: 1;
}
.opacity-off {
  opacity: 0;
  transition: opacity 1s ease;
}
@media (min-width: 768px) {
  .opacity-on, .opacity-off {
    opacity: 1;
  }
}
</style>
