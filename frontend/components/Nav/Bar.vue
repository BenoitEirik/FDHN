<template>
  <div class="relative w-full flex">
    <NavLogo class="flex-none" />
    <NavLinks :drop="checkedBurger" />
    <NavBurger class="flex-1" @checked="(bool) => checkedBurger = bool" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedBurger: false
    }
  }
}
</script>
