<template>
  <nuxt-link to="/">
    <img ref="logo" src="@/assets/images/Logo-FDHN.png" class="md:w-64 w-48">
  </nuxt-link>
</template>

<script>
export default {
  beforeMount () {
    window.addEventListener('scroll', this.scrollBrowserHandler)
  },
  methods: {
    scrollBrowserHandler () {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        this.$refs.logo.classList.add('scrolling')
      } else {
        this.$refs.logo.classList.remove('scrolling')
      }
    }
  }
}
</script>

<style>
.scrolling {
  width: 170px !important;
  transition: all 100ms linear;
}
@media (min-width: 768px) {
  .scrolling {
    width: 200px !important;
    transition: all 100ms linear;
  }
}
</style>
