<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <div class="relative w-full ">
        <img
          class="relative w-56 -z-10 left-1/2 -translate-x-1/2"
          src="@/assets/images/brochure/image-001.png"
        >
        <h1 class="absolute w-11/12 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-center">
          {{ page.title }}
        </h1>
      </div>
      <nuxt-content
        class="mt-10 max-w-5xl md:prose-lg sm:prose-base prose-sm text-justify"
        :document="page"
      />
      <div>
        <nuxt-content
          class="text-right prose-lg"
          :document="signature"
        />
        <div class="w-full flex justify-end">
          <img
            class="w-48"
            src="@/assets/images/brochure/image-005.png"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  async asyncData ({ $content }) {
    const page = await $content('pages/Accueil/accueil').fetch()
    const signature = await $content('pages/Accueil/signature').fetch()
    return {
      page,
      signature
    }
  }
}
</script>
