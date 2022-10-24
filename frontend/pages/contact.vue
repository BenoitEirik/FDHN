<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <div class="p-6 hero">
        <div class="hero-content prose sm:prose-base prose-sm text-center">
          <div class="max-w-md">
            <h1>
              Contact
            </h1>
            <p class="py-6">
              Pour prendre contact avec le Fonds de dotation :
            </p>
            <Mailto class="btn btn-primary" mail="fondshn@gmail.com" subject="[fdhn.fr] Prise de contact" body="" title="Presser pour joindre le Fonds de dotation">
              Contacter
            </Mailto>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Contact - Fonds de dotation de l\'Homme Nouveau'
    }
  }
}
</script>
