<template>
  <nuxt-link
    ref="myLink"
    :class="'p-5 text-xl hover:scale-110 transition-all ease-out text-center nuxt-link-effect ' + (activeDonateClass ? 'decorated':'')"
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
  data () {
    return {
      activeDonateClass: false
    }
  },
  mounted () {
    if (this.name.includes('don')) {
      this.activeDonateClass = true
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
    color: #eab308;
}
.nuxt-link-effect {
  background: linear-gradient(to right, #eab308 50%, #000 0%);
  background-size: 200% 200%;
  background-position: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 300ms;
}
.nuxt-link-effect:hover {
  background-position: 0;
}
.decorated {
  text-decoration: underline;
  text-decoration-color: #eab308;
  text-decoration-thickness: 3px;
}
</style>
