<template>
  <div :class="(drop ? 'dropdown':'dropup') + ' md:static absolute p-8 flex md:flex-row flex-col md:justify-end justify-center items-center left-0 top-full right-0 w-full'">
    <NavLink to="/" name="Accueil" />
    <NavLink to="/homme-nouveau" name="L'Homme Nouveau" />
    <NavLink to="/temoignages" name="Témoignages" />
    <NavLink to="/dons" name="Dons" />
  </div>
</template>

<script>
export default {
  props: {
    drop: {
      type: Boolean,
      default: false
    }
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
