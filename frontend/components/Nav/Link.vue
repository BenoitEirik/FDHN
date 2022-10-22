<template>
  <nuxt-link
    ref="myLink"
    :class="'px-5 py-2 md:text-xl text-lg transition-all ease-out text-center rounded-lg nuxt-link-effect ' + (donateLinkClass ? 'decorated':'')"
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
      donateLinkClass: false
    }
  },
  mounted () {
    if (this.name.includes('don')) {
      this.donateLinkClass = true
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  background: unset !important;
  background-clip: unset !important;
  -webkit-text-fill-color: #eab308 !important;
}
.nuxt-link-effect {
  background: linear-gradient(to right, #eab308 50%, #000 0%);
  background-size: 200% 100%;
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
  text-decoration-thickness: 2px;
}
</style>
