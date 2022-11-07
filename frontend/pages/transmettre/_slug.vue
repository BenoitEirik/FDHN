<template>
  <div class="flex flex-col items-center p-6">
    <!-- Breadcrumbs -->
    <OtherBreadcrumbs class="max-w-5xl w-full" parent="Transmettre" :child="page.title" />
    <!-- Title -->
    <OtherTitle :title="page.title" />
    <!-- Content types -->
    <div
      v-for="(item, index) in page.content"
      :key="index"
      class="max-w-5xl w-full"
    >
      <!-- Textbox -->
      <div
        v-if="item.textbox !== null && item.textbox !== ''"
        class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify"
        v-html="item.textbox"
      />
      <!-- Encadré -->
      <OtherCadre
        v-else-if="item.cadre != null && item.cadre.textbox !== ''"
        :logo="item.cadre.logo"
        :contenu="item.cadre.textbox"
      />
      <!-- Citations -->
      <div
        v-else-if="item.citations != null"
        class="pt-6 w-full flex justify-center flex-wrap items-start gap-6"
      >
        <OtherCitation
          v-for="(citation, indexCitation) in item.citations"
          :key="indexCitation"
          :data="citation.citation"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ route, $axios, $config }) {
    const page = await $axios.$get($config.COCKPIT.URL + `/api/content/item/page/${route.query.id}`)

    return {
      page
    }
  },
  head () {
    return {
      title: `${this.page.title} - Fonds de dotation de L'Homme Nouveau`
    }
  }
}
</script>
