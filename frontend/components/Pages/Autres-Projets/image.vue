<template>
  <nuxt-img class="float-right !ml-6 !mb-2 rounded" format="webp" :src="src" />
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
