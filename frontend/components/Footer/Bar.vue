<template>
  <footer class="relative text-center p-10 bg-base-200 text-primary-content">
    <div class="mx-auto prose md:prose-lg sm:prose-base prose-sm">
      <nuxt-link to="/">
        <nuxt-img class="!mt-0 mx-auto lg:w-64 w-48" format="webp" src="fdhn.webp" />
      </nuxt-link>
      <p class="font-bold">
        62 rue des Chantiers<br>78000 Versailles
      </p>
      <Mailto class="btn btn-primary" mail="fondshn@gmail.com" subject="[fdhn.fr] Prise de contact" body="" title="Presser pour joindre le Fonds de dotation">
        Contacter
      </Mailto>
      <p>Copyright © {{ new Date().getFullYear() }} - Tous droits réservés</p>
    </div>
  </footer>
</template>
