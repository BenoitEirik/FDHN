<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <div class="relative w-full h-14">
        <h1 class="absolute w-9/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-center">
          {{ page.title }}
        </h1>
      </div>
      <nuxt-content
        class="max-w-5xl prose-lg text-justify"
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
