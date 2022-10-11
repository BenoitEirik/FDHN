<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <h1 class="p-6 text-3xl text-center">
        {{ page1.title }}
      </h1>
      <div class="mt-10 p-6 max-w-5xl flex justify-center flex-wrap items-center bg-orange-50 rounded">
        <DonsCard name="Legs" to="/dons/legs" />
        <DonsCard name="Testaments" to="/dons/testaments" />
        <DonsCard name="Donations" to="/dons/donations" />
        <DonsCard name="Assurance vie" to="/dons/assurance-vie" />
        <DonsCard name="Don succession" to="/dons/don-succession" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaireUnDon',
  async asyncData ({ $content }) {
    const page1 = await $content('pages/Dons/page-1').fetch()
    return {
      page1
    }
  }
}
</script>
