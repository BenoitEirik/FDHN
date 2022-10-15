<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page.title }}
      </h1>
      <div class="relative mt-10 flex justify-center flex-wrap items-center">
        <img class="absolute -z-10 w-full h-full object-cover rounded-md" src="@/assets/images/604a6d05811832441d2a83a0.jpg">
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
    const page = await $content('pages/Temoignages/page-1').fetch()
    const temoignages = [
      await $content('pages/Temoignages/temoignage-1').fetch(),
      await $content('pages/Temoignages/temoignage-2').fetch(),
      await $content('pages/Temoignages/temoignage-3').fetch()
    ]
    return {
      page,
      temoignages
    }
  }
}
</script>
