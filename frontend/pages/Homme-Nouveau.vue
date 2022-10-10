<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page.title }}
      </h1>
      <div class="mt-10 max-w-5xl">
        <vueper-slides
          class="no-shadow"
          :visible-slides="3"
          :gap="3"
          slide-multiple
          :slide-ratio="1.2/3"
          prevent-y-scroll
          autoplay
          :breakpoints="breakpoints"
          :arrows="false"
        >
          <vueper-slide v-for="(slide, i) in slides" :key="i">
            <template #content>
              <img class="m-auto h-full object-contain" :src="require(`../assets/images/brochure/${slide}`)">
            </template>
          </vueper-slide>
        </vueper-slides>
      </div>
      <nuxt-content class="max-w-5xl prose-lg text-justify" :document="page" />
      <HommenouveauCadre :cadre="cadre" />
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  async asyncData ({ $content }) {
    const page = await $content('pages/Homme-Nouveau/homme-nouveau').fetch()
    const cadre = await $content('pages/Homme-Nouveau/cadre').fetch()
    return {
      page,
      cadre
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
