<template>
  <div class="container-fluid d-flex flex-column vh-100">
    <router-view name="navbar" />

    <main
      class="d-flex flex-fill justify-content-start overflow-auto"
    >
      <router-view />
    </main>
  </div>
</template>

<script>

// import Navbar from './components/Navbar.vue';

export default {

	name: 'App',

	components: {
		// Navbar
	}

};

</script>

<style scoped>

</style>
