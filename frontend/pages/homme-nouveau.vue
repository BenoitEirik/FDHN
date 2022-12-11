<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div v-for="(item, index) in page.content" :key="index">
        <vueper-slides
          v-if="item.hasOwnProperty('carousel') && item.carousel !== null && item.carousel.length !== 0"
          class="max-w-5xl no-shadow"
          prevent-y-scroll
          :dragging-distance="50"
          bullets-outside
          arrows
          :arrows-outside="false"
          :visible-slides="3"
          :gap="3"
          :slide-ratio="1.2/3"
          autoplay
          :breakpoints="breakpoints"
        >
          <vueper-slide v-for="(slide, i) in item.carousel" :key="i">
            <template #content>
              <nuxt-img class="m-auto h-full object-contain" format="webp" :src="`https://admin.fdhn.fr/storage/uploads${slide.path}`" />
            </template>
          </vueper-slide>
        </vueper-slides>
        <div
          v-else-if="item.textbox !== null && item.textbox !== ''"
          class="mt-12 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify"
          v-html="item.textbox"
        />
        <OtherCadre v-else-if="item.cadre !== null && item.cadre !== ''" :logo="item.cadre.logo" :contenu="item.cadre.textbox" />
      </div>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  async asyncData ({ $axios, $config }) {
    const page = await $axios.$get($config.COCKPIT.URL + '/api/content/item/page/09dbd5533864632aeb0002f5')
    return {
      page
    }
  },
  data () {
    return {
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
  },
  head () {
    return {
      title: 'L\'Homme Nouveau - Fonds de dotation de L\'Homme Nouveau'
    }
  }
}
</script>

<style>
.vueperslides__arrow {
  color: black;
}
</style>
