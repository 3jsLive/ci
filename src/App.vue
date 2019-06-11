<template>
  <div class="h-100">
    <router-view name="navbar" />

    <main
      class="h-100"
      style="padding-top: 56px;"
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
