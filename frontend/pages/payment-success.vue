<template>
  <div class="flex flex-col items-center">
    <div class="m-6">
      <div class="p-6 hero">
        <div class="hero-content prose sm:prose-base prose-sm text-center">
          <div class="max-w-md">
            <h1>
              Merci
            </h1>
            <p class="py-6">
              Le don a été effectué, merci de votre générosité !
            </p>
            <button class="btn btn-primary" @click="$router.push({ path: '/' })">
              Retourner à la page d'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
