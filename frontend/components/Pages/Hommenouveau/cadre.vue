<template>
  <div class="max-w-5xl rounded cadre-shadow">
    <img
      class="m-auto pt-9 px-9 w-96 cadre-logo-drop-shadow"
      :src="img"
    >
    <nuxt-content
      class="px-9 pb-9 max-w-full prose md:prose-lg sm:prose-base prose-sm"
      :document="cadre"
    />
  </div>
</template>

<script>
export default {
  props: {
    cadre: {
      type: Object,
      default () {
        return {}
      }
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.cadre-shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.cadre-logo-drop-shadow {
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white);
}
</style>
