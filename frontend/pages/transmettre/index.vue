<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <!-- Title -->
      <OtherlTitle :title="page1.title" />
      <!-- Content -->
      <div class="p-6 max-w-5xl w-full flex flex-wrap justify-center gap-6">
        <PagesTransmettreCard
          v-for="project in projects"
          :key="project.title"
          :title="project.title"
          :to="project.to"
          :description="project.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page1 = await $content('pages/transmettre/page-1').only(['title']).fetch()
    const projects = await $content('pages/transmettre', { deep: true }).where({ path: { $contains: 'page-1', $containsNone: '/pages/transmettre/page-1' } }).skip(1).only(['title', 'to', 'description']).fetch()
    return {
      page1,
      projects
    }
  }
}
</script>
