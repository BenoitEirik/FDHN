<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.title" />
      <!-- Content -->
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="my-6 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify overflow-hidden"
      >
        <h2>{{ project.title }}</h2>
        <PagesAutresProjetsImage v-if="project.image !== null" :src="$config.COCKPIT.ASSETS + project.image.path" class="sm:m-0 m-auto md:w-48 w-28" />
        <div v-html="project.textbox" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios, $config }) {
    const page = await $axios.$get($config.COCKPIT.URL + '/api/content/item/page/14ff733d626435c85500032b')

    const projects = []
    const causes = Array.from(page.content[0].causes)
    for (let i = 0; i < causes.length; i++) {
      projects.push(await $axios.$get($config.COCKPIT.URL + `/api/content/item/causes/${causes[i]._id}`))
    }

    return {
      page,
      projects
    }
  },
  head () {
    return {
      title: 'Autres projets - Fonds de dotation de L\'Homme Nouveau'
    }
  }
}
</script>
