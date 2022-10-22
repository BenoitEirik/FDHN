<template>
  <div class="hero">
    <div class="hero-content prose md:prose-lg sm:prose-base prose-sm text-center">
      <h1 class="text-center">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
