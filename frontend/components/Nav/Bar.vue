<template>
  <div ref="bar" class="sticky top-0 inset-x-0 bg-white z-50">
    <div class="relative flex">
      <NavLogo class="flex-none" @reduced="onReduced" />
      <NavLinks class="flex-1" />
      <NavBurger class="flex-1" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reduced: false
    }
  },
  methods: {
    onReduced (bool) {
      if (bool) {
        this.$refs.bar.classList.add('bottom-border')
      } else {
        this.$refs.bar.classList.remove('bottom-border')
      }
    }
  }
}
</script>

<style scoped>
.bottom-border {
  border-bottom: 1px solid #eab308;
  transition: border 2s;
}
</style>
