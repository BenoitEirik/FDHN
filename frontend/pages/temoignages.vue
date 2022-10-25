<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div class="relative flex justify-center flex-wrap items-center">
        <nuxt-img class="absolute -z-10 w-full h-full object-cover rounded-md" format="webp" src="604a6d05811832441d2a83a0.jpg" />
        <PagesTemoignagesCard v-for="(temoignage, index) in temoignages" :key="index" :data="temoignage" />
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
      title: 'Témoigngages - Fonds de dotation de L\'Homme Nouveau',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'L\'Homme Nouveau soutient la foi de nombreux catholiques fervents. Retrouvez le témoignages de trois lecteurs de L\'Homme Nouveau. « Je m’appelle Nicolas, j’ai 27 ans. J’ai étudié la philosophie à l’IPC, puis j’ai obtenu un master à l’EMD. Je me destine à présent à l’enseignement. Mes parents m’ont abonné à L’Homme Nouveau. Pour être honnête, au début, je ne voyais pas trop l’intérêt. Je dois reconnaître, au bout de plusieurs mois, que je m’étais un peu trop habitué à glaner des informations un peu partout sur internet sans avoir de ligne directrice. Beaucoup des jeunes de mon âge pensent avoir l’esprit libre alors qu’ils ne font que se nourrir d’images et de commérages. À présent, je sais que j’ai au moins un repère, L’Homme Nouveau, et cela me convient très bien. »'
        }
      ]
    }
  }
}
</script>
