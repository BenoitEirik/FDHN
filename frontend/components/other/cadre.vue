<template>
  <div class="mt-6 max-w-5xl rounded contenu-shadow">
    <nuxt-img
      v-if="logo !== {}"
      class="m-auto p-6 w-96 contenu-logo-drop-shadow"
      format="webp"
      :src="$config.COCKPIT.ASSETS + logo.path"
      :alt="logo.title"
    />
    <div
      class="px-9 pb-9 max-w-full prose md:prose-lg sm:prose-base prose-sm"
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
