<template>
  <div :to="to" class="card md:w-96 sm:w-72 w-full hover:shadow-lg shadow-md border border-[#eab308]">
    <div class="card-body prose md:prose-lg sm:prose-base prose-sm">
      <h2 class="card-title">
        {{ title }}
      </h2>
      <p class="line-clamp-3">
        {{ description }}
      </p>
      <div class="card-actions justify-center">
        <button class="btn btn-primary" @click="$router.push({ path: to })">
          Ouvrir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>
