<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div class=" max-w-7xl w-full flex flex-wrap justify-center gap-6">
        <OtherNavcard
          v-for="(subpage, index) in Array.from(metadata.children)"
          :key="index"
          :title="subpage.title"
          :to="$nuxt.$route.path + subpage.url"
          :subpage-id="subpage.data.page._id"
          :description="subpage.data.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, $config }) {
    const page = await $axios.$get($config.COCKPIT.URL + '/api/content/item/page/7dfc1b7636633153890003a5')
    const menu = await $axios.$get($config.COCKPIT.URL + '/api/content/item/navigation')
    const metadata = Array.from(menu.pages).find(metadata => metadata.title === 'Transmettre')

    return {
      page,
      metadata
    }
  },
  head () {
    return {
      title: 'Comment soutenir durablement nos projets ? - Fonds de dotation de L\'Homme Nouveau'
    }
  }
}
</script>
