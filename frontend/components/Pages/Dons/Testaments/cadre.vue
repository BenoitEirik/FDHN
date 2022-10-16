<template>
  <div class="max-w-xl rounded cadre-shadow">
    <nuxt-content
      class="p-9 max-w-full prose md:prose-lg sm:prose-base prose-sm  text-center"
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
