<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="px-6 py-12 form-control">
      <label class="input-group">
        <span>Don</span>
        <input type="text" placeholder="1" class="w-28 min-w-0 input input-bordered" @change="checkAmount">
        <span>€</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkAmount () {
      this.$emit('can-continue', { value: true })
    }
  }
}
</script>
