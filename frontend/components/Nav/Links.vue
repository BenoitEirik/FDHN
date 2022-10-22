<template>
  <div :class="(droppedMenu ? 'dropdown':'dropup') + ' lg:static absolute px-8 flex lg:flex-row flex-col lg:flex-wrap lg:justify-end justify-evenly lg:items-center items-start left-0 top-full right-0 w-full bg-white z-50 overflow-hidden'">
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
  left: 0;
  height: calc(100vh - 100%);
  transition: left 300ms ease-in-out;
}
.dropup {
  left: -100%;
  height: calc(100vh - 100%);
  transition: left 300ms ease-in-out;
}
@media (min-width: 1024px) {
  .dropdown, .dropup {
    transform: unset;
    height: auto;
  }
}
</style>
