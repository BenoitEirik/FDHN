<template>
  <div :class="(droppedMenu ? 'dropdown':'dropup') + ' md:static absolute pr-8 flex md:flex-row flex-col md:justify-end justify-center items-center left-0 top-full right-0 w-full bg-white z-50'">
    <NavLink
      to="/"
      name="Accueil"
    />
    <NavLink
      to="/homme-nouveau"
      name="L'Homme Nouveau"
    />
    <NavLink
      to="/autres-projets"
      name="Autres projets"
    />
    <NavLink
      to="/temoignages"
      name="Témoignages"
    />
    <NavLink
      to="/don"
      name="Faire un don"
    />
    <NavLink
      to="/transmettre"
      name="Transmettre"
    />
    <NavLink
      to="/contact"
      name="Contact"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      droppedMenu: false
    }
  },
  created () {
    this.$nuxt.$on('drop-menu', (value) => {
      this.droppedMenu = value
    })
  }
}
</script>

<style>
.dropdown {
  display: flex;
  height: calc(100vh - 100%);
  transform: all 1s ease-out;
}
.dropup {
  display: none;
  height: 0;
}
@media (min-width: 768px) {
  .dropdown, .dropup {
    display: flex;
    height: auto;
  }
}
</style>
