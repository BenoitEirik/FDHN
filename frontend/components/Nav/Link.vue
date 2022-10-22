<template>
  <nuxt-link
    ref="myLink"
    :class="'p-5 text-xl hover:scale-110 transition-all ease-out text-center ' + (activeDonateClass ? 'decorated':'')"
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

<style scoped>
.decorated {
  text-decoration: underline;
  text-decoration-color: #eab308;
  text-decoration-thickness: 3px;
}
</style>
