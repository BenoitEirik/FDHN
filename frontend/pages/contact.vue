<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page" />
      <div class="mt-6 flex justify-center">
        <Mailto class="btn btn-primary" mail="fondshn@gmail.com" subject="[fdhn.fr] Prise de contact" body="" title="Presser pour joindre le Fonds de dotation">
          Contacter
        </Mailto>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('pages/contact/page').fetch()
    return {
      page
    }
  },
  head () {
    return {
      title: 'Contact - Fonds de dotation de L\'Homme Nouveau',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Vous cherchez de l\'aide ou des informations sur le Fonds de dotation de L\'Homme Nouveau ? Visitez la page « Contact » pour nous communiquer votre demande. Nous nous tenons à votre disposition pour vous éclairer. N\'hésitez pas à consulter les projets que nous soutenons et de faire un don pour nous aider à les financer.'
        }
      ]
    }
  }
}
</script>
