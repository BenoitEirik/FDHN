<template>
  <div class="md:hidden relative min-w-20">
    <input class="absolute left-0 top-0 w-full h-full cursor-pointer opacity-0" type="checkbox" value="false" @change="check()">
    <div class="p-6 absolute left-0 top-0 w-full h-full flex justify-end items-center pointer-events-none">
      <p class="text-2xl" :style="checked ? 'color: #FBBF24':''">
        MENU
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeBrowserHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeBrowserHandler)
  },
  methods: {
    resizeBrowserHandler (event) {
      if (Number(event.target.innerWidth) > 768) {
        this.checked = false
        this.$emit('checked', this.checked)
      }
    },
    check () {
      this.checked = !this.checked
      this.$emit('checked', this.checked)
    }
  }
}
</script>

<style scoped>
.burger-colorized {
  color: #FBBF24;
}
</style>
