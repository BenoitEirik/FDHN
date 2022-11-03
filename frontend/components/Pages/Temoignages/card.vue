<template>
  <div class="relative m-6 md:p-6 sm:p-5 p-4 rounded-md bg-red-50">
    <nuxt-img
      class="absolute left-0 top-0 md:w-16 sm:w-12 w-8  bg-red-50 z-10 rounded-full"
      format="webp"
      src="quote-open.png"
    />
    <div
      class="p-6 max-w-lg prose md:prose-lg sm:prose-base prose-sm text-justify border-yellow-500 border-2 rounded-md"
      v-html="data"
    />
    <nuxt-img
      class="absolute right-0 bottom-0 md:w-16 sm:w-12 w-8 bg-red-50 z-10 rounded-md"
      format="webp"
      src="quote-close.png"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    }
  }
}
</script>
