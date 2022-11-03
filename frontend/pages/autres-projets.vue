<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherTitle :title="page.content.title" />
      <!-- Content -->
      <div class="my-6 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify" v-html="page.content[0].textbox" />
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="my-6 max-w-5xl prose md:prose-lg sm:prose-base prose-sm text-justify"
      >
        <PagesAutresProjetsImage v-if="project.image !== null" :src="$config.COCKPIT.ASSETS + project.image.path" />
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
    Array.from(page.content[1].causes).forEach(async (metadata) => {
      const project = await $axios.$get($config.COCKPIT.URL + `/api/content/item/causes/${metadata._id}`)
      projects.push(project)
    })

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
