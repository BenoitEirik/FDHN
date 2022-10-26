<template>
  <div class="flex flex-col items-center">
    <div class="m-6 max-w-5xl">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <nuxt-content class="max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" :document="page" />
      <div class="form-control w-full">
        <!-- Sujet -->
        <label class="label">
          <span class="label-text">Sujet</span>
        </label>
        <input v-model="subject" type="text" placeholder="Sujet du message" class="input input-bordered focus:input-primary w-full">
        <!-- Corps du message -->
        <label class="label">
          <span class="label-text">Corps du message</span>
        </label>
        <textarea v-model="body" class="textarea textarea-bordered focus:input-primary w-full h-60" placeholder="Message à adresser au Fonds de dotation..." />
      </div>
      <!-- Submit -->
      <div class="mt-6 flex justify-center">
        <Mailto
          class="btn btn-primary"
          mail="fondshn@gmail.com"
          :subject="`[fdhn.fr] ${subject}`"
          :body="`----------------------------\nÉcrit depuis fdhn.fr\n----------------------------\n\n${body}`"
          title="Presser pour joindre le Fonds de dotation"
        >
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
  data () {
    return {
      subject: '',
      body: ''
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
