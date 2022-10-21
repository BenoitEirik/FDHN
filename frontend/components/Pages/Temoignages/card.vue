<template>
  <div class="relative m-6 p-6 rounded-md bg-red-50">
    <nuxt-img
      class="absolute left-0 top-0 w-16 bg-red-50 z-10 rounded-md"
      format="webp"
      src="quote-open.png"
    />
    <nuxt-content
      class="p-6 max-w-lg prose md:prose-lg sm:prose-base prose-sm text-justify border-yellow-500 border-2 rounded-md"
      :document="data"
    />
    <nuxt-img
      class="absolute right-0 bottom-0 w-16 bg-red-50 z-10 rounded-md"
      format="webp"
      src="quote-close.png"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
