<template>
  <nuxt-link to="/">
    <img ref="logo" src="@/assets/images/fdhn.png" class="md:w-64 w-48">
  </nuxt-link>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 150) {
          this.$refs.logo.classList.add('reduced-navbar')
          this.$refs.logo.classList.remove('reduced-navbar-removing')
        } else {
          this.$refs.logo.classList.remove('reduced-navbar')
          this.$refs.logo.classList.add('reduced-navbar-removing')
        }
      })
    })
  }
}
</script>

<style>
.reduced-navbar {
  width: 170px !important;
  transition: width 100ms linear;
}
.reduced-navbar-removing {
  transition: width 100ms linear;
}
@media (min-width: 768px) {
  .reduced-navbar {
    width: 200px !important;
    transition: width 100ms linear;
  }
}
</style>
