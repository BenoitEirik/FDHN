<template>
  <footer class="relative text-center p-10 bg-base-200 text-primary-content">
    <div class="mx-auto prose md:prose-lg sm:prose-base prose-sm">
      <nuxt-link to="/">
        <nuxt-img class="!mt-0 mx-auto lg:w-64 w-48" format="webp" :src="$config.COCKPIT.URL + '/storage/uploads' + footer.logo.path" />
      </nuxt-link>
      <div v-html="footer.contenu" />
      <Mailto class="btn btn-primary" mail="fondshn@gmail.com" subject="[fdhn.fr] Prise de contact" body="" title="Presser pour joindre le Fonds de dotation">
        Contacter
      </Mailto>
      <p>Copyright © {{ new Date().getFullYear() }} - Tous droits réservés</p>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      footer: {}
    }
  },
  async fetch () {
    this.footer = await this.$axios.$get(this.$config.COCKPIT.URL + '/api/content/item/footer')
  }
}
</script>
