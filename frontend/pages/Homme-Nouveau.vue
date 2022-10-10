<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page.title }}
      </h1>
      <nuxt-content
        class="mt-10 max-w-5xl prose-lg text-justify"
        :document="page"
      />
      <HommenouveauCadre :cadre="cadre" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('pages/Homme-Nouveau/homme-nouveau').fetch()
    const cadre = await $content('pages/Homme-Nouveau/cadre').fetch()
    return {
      page,
      cadre
    }
  }
}
</script>
