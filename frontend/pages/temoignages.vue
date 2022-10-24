<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div class="relative flex justify-center flex-wrap items-center">
        <nuxt-img class="absolute -z-10 w-full h-full object-cover rounded-md" format="webp" src="604a6d05811832441d2a83a0.jpg" />
        <PagesTemoignagesCard :data="temoignages[0]" />
        <PagesTemoignagesCard :data="temoignages[1]" />
        <PagesTemoignagesCard :data="temoignages[2]" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Temoignages',
  async asyncData ({ $content }) {
    const page = await $content('pages/temoignages/page-1').fetch()
    const temoignages = [
      await $content('pages/temoignages/temoignage-1').fetch(),
      await $content('pages/temoignages/temoignage-2').fetch(),
      await $content('pages/temoignages/temoignage-3').fetch()
    ]
    return {
      page,
      temoignages
    }
  },
  head () {
    return {
      title: 'Témoigngages - Fonds de dotation de l\'Homme Nouveau'
    }
  }
}
</script>
