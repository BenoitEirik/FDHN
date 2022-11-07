<template>
  <div class="lg:text-lg sm:text-base text-sm breadcrumbs">
    <ul>
      <li>
        <nuxt-link to="/transmettre">
          {{ parent }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="$nuxt.$route.fullPath">
          {{ child }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: ''
    },
    child: {
      type: String,
      default: ''
    }
  }
}
</script>
