<template>
  <div class="px-6 py-12 flex flex-col items-center">
    <div class="form-control w-full max-w-xs">
      <!-- Montant -->
      <label class="label">
        <span class="label-text">Montant</span>
      </label>
      <input ref="amountRef" type="text" placeholder="1€ minimum" class="input input-bordered w-full max-w-xs" @change="validateAmount">
      <label class="label">
        <span class="label-text-alt">Tous les dons sont défiscalisables</span>
      </label>
      <!-- Cause -->
      <label class="label">
        <span class="label-text">Cause</span>
      </label>
      <select class="select select-bordered">
        <option selected>
          L'Homme Nouveau
        </option>
        <option>
          La Scolafricaine
        </option>
        <option>
          Le CIELT
        </option>
        <option>
          L'association Amitié Charles de Foucauld
        </option>
      </select>
      <!-- Nom -->
      <label class="label">
        <span class="label-text">Nom</span>
      </label>
      <input type="text" placeholder="Nom" class="input input-bordered w-full max-w-xs">
      <!-- Prénom -->
      <label class="label">
        <span class="label-text">Prénom</span>
      </label>
      <input type="text" placeholder="Prénom" class="input input-bordered w-full max-w-xs">
      <!-- Adresse e-mail -->
      <label class="label">
        <span class="label-text">Adresse e-mail</span>
      </label>
      <input type="email" placeholder="adresse@email.com" class="input input-bordered w-full max-w-xs">
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
