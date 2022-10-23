<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="px-6 py-12 form-control">
      <label class="input-group">
        <span>Don</span>
        <input ref="amountRef" type="text" placeholder="1" class="w-28 min-w-0 input input-bordered" @change="validateAmount">
        <span>€</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    validateAmount () {
      if (this.isNumeric(String(this.$refs.amountRef.value))) {
        this.$store.commit('setAmount', Number(this.$refs.amountRef.value))
        this.$emit('can-continue', { value: true })
      } else {
        alert('Merci d\'entrer un montant valide d\'au moins 1€')
      }
    },
    isNumeric (str) {
      if (typeof str !== 'string') {
        return false
      }
      return !isNaN(str) && !isNaN(parseFloat(str))
    }
  }
}
</script>
