<template>
  <div class="sticky top-0 inset-x-0 bg-white">
    <div class="relative flex">
      <NavLogo class="flex-none" />
      <NavLinks :drop="checkedBurger" class="flex-1" />
      <NavBurger class="flex-1" @checked="(bool) => checkedBurger = bool" />
    </div>
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
