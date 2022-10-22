<template>
  <div class="mb-8 max-w-5xl m-auto hero">
    <div class="hero-content prose md:prose-lg sm:prose-base prose-sm text-center">
      <h1 class="text-center !leading-normal">
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
