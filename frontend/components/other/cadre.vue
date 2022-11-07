<template>
  <div class="mt-6 max-w-5xl w-full rounded contenu-shadow">
    <nuxt-img
      v-if="logo !== null"
      class="m-auto pt-6 px-6 w-96 contenu-logo-drop-shadow"
      format="webp"
      :src="$config.COCKPIT.ASSETS + logo.path"
      :alt="logo.title"
    />
    <div
      class="md:p-6 sm:p-5 p-4 max-w-full prose md:prose-lg sm:prose-base prose-sm"
      v-html="contenu"
    />
  </div>
</template>

<script>
export default {
  props: {
    logo: {
      type: Object,
      default: () => {}
    },
    contenu: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.contenu-shadow {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.contenu-logo-drop-shadow {
  filter: drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white);
}
</style>
