<template>
  <div :to="to" class="card md:w-5/12 w-full bg-base-100 shadow-xl">
    <div class="card-body prose md:prose-lg sm:prose-base prose-sm">
      <h2 class="card-title truncate">
        {{ title }}
      </h2>
      <p class="line-clamp-3">
        {{ description }}
      </p>
      <div class="card-actions justify-end">
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
