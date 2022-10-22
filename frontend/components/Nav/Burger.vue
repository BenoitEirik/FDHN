<template>
  <div class="lg:hidden relative min-w-20">
    <input class="absolute left-0 top-0 w-full h-full cursor-pointer opacity-0" type="checkbox" value="false" @change="$nuxt.$emit('check-burger')">
    <div class="p-6 absolute left-0 top-0 w-full h-full flex justify-end items-center pointer-events-none">
      <p ref="burgerRef" class="text-xl burger-effect">
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
    this.$nuxt.$on('check-burger', () => {
      // Apply only if the window is mobile
      if (Number(window.innerWidth) <= 1024) {
        this.checked = !this.checked
        this.burgerEffect()
        this.$nuxt.$emit('drop-menu', this.checked)
      }
    })
    window.addEventListener('resize', this.resizeBrowserHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeBrowserHandler)
  },
  methods: {
    resizeBrowserHandler (event) {
      if (Number(event.target.innerWidth) > 1024) {
        this.checked = false
        this.$nuxt.$emit('drop-menu', this.checked)
      }
    },
    burgerEffect () {
      if (this.checked) {
        this.$refs.burgerRef.classList.add('burger-effect-checked')
      } else {
        this.$refs.burgerRef.classList.remove('burger-effect-checked')
      }
    }
  }
}
</script>

<style scoped>
.burger-effect {
  background: linear-gradient(to right, #eab308 50%, #000 0%);
  background-size: 200% 200%;
  background-position: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 300ms;
}
.burger-effect-checked {
  background-position: 0;
}
</style>
