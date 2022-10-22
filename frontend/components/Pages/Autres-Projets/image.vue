<template>
  <nuxt-img class="float-right !ml-6 !mb-2 rounded max" format="webp" :src="src" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>
