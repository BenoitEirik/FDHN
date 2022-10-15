<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <div class="mt-10 max-w-5xl">
        <vueper-slides
          class="no-shadow"
          :dragging-distance="50"
          bullets-outside
          arrows
          :arrows-outside="false"
          :visible-slides="3"
          :gap="3"
          slide-multiple
          :slide-ratio="1.2/3"
          autoplay
          :breakpoints="breakpoints"
        >
          <vueper-slide v-for="(slide, i) in slides" :key="i">
            <template #content>
              <img class="m-auto h-full object-contain" :src="require(`../assets/images/brochure/${slide}`)">
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page1" />
      <PagesHommenouveauCadre :cadre="cadre1" :bg-class="'bg-red-700'" :color-class="'text-white'" :img="require(`../assets/images/Logo-HN.png`)" />
      <h1 class="mt-12 p-6 text-3xl text-center">
        {{ page2.title }}
      </h1>
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page2" />
      <PagesHommenouveauCadre :cadre="cadre2" :bg-class="'bg-white'" :img="require(`../assets/images/Logo-FDHN.png`)" />
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Homme-Nouveau/page-1').fetch()
    const cadre1 = await $content('pages/Homme-Nouveau/cadre-1').fetch()
    const page2 = await $content('pages/Homme-Nouveau/page-2').fetch()
    const cadre2 = await $content('pages/Homme-Nouveau/cadre-2').fetch()
    return {
      page1,
      cadre1,
      page2,
      cadre2
    }
  },
  data () {
    return {
      slides: [
        'image-008.png',
        'image-010.png',
        'image-012.png',
        'image-014.png',
        'image-016.png',
        'image-018.png',
        'image-020.png'
      ],
      breakpoints: {
        640: {
          visibleSlides: 1,
          slideRatio: 1 / 1.2
        },
        768: {
          visibleSlides: 1,
          slideRatio: 1 / 1.5
        },
        1024: {
          visibleSlides: 2,
          slideRatio: 1 / 2
        }
      }
    }
  }
}
</script>

<style>
.vueperslides__arrow {
  color: black;
}
</style>
