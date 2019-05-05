<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a
      class="navbar-brand"
      href="#"
    >3ci</a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link
            to="/"
            class="nav-link"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            id="navbarDropdownChecks"
            class="nav-link dropdown-toggle text-white"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Checks
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdownChecks"
          >
            <router-link
              to="/checksSummary"
              class="dropdown-item disabled"
            >
              Summary
            </router-link>
            <div class="dropdown-divider" />
            <router-link
              to="/docsdecl"
              class="dropdown-item"
            >
              Docs vs. Declaration<br>
              <em class="small">Parse the documentation and compare it against the declaration files</em>
            </router-link>
            <router-link
              to="/objdecl"
              class="dropdown-item"
            >
              Objects vs. Declaration<br>
              <em class="small">Try and instantiate objects and then compare their properties and methods with the declaration files</em>
            </router-link>
            <router-link
              to="/srcdecl"
              class="dropdown-item"
            >
              Source vs. Declaration<br>
              <em class="small">Scan certain source files for differences with the declaration files</em>
            </router-link>
            <router-link
              to="/checkWithTS"
              class="dropdown-item"
            >
              Test with TypeScript compiler<br>
              <em class="small">Let the TypeScript compiler check all JavaScript files for type- and other errors</em>
            </router-link>
            <router-link
              to="/checkDocsExamples"
              class="dropdown-item"
            >
              Scan Docs for broken example links<br>
              <em class="small">Search for broken <code>[example: ...]</code> links in the documentation</em>
            </router-link>
            <router-link
              to="/checkDocsExternals"
              class="dropdown-item"
            >
              Scan Docs for broken external links<br>
              <em class="small">Search for <code>[link: ...]</code> tags with outdated target URLs</em>
            </router-link>
            <router-link
              to="/checkNonDocsExternals"
              class="dropdown-item"
            >
              Scan Non-Docs for broken external links<br>
              <em class="small">Search other HTML and JavaScript files for references of broken URLs</em>
            </router-link>
            <router-link
              to="/checkNpm"
              class="dropdown-item"
            >
              Check NPM for outdated dependencies<br>
              <em class="small">Query the NPM registry for available updates to the dependencies</em>
            </router-link>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            id="navbarDropdownLinters"
            class="nav-link dropdown-toggle text-white"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Linters
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdownLinters"
          >
            <router-link
              to="/lintersSummary"
              class="dropdown-item disabled"
            >
              Summary
            </router-link>
            <div class="dropdown-divider" />
            <a
              class="dropdown-item disabled"
              href="#"
            >doobsDoc</a>
            <a
              class="dropdown-item disabled"
              href="#"
            >HTMLLint</a>
            <a
              class="dropdown-item disabled"
              href="#"
            >StyleLint (CSS)</a>
            <a
              class="dropdown-item disabled"
              href="#"
            >ESLint</a>
            <a
              class="dropdown-item disabled"
              href="#"
            >glsl Validator</a>
          </div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >Type Search</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >Profiling</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >Dependencies</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >Stats'n'Graphs</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >System</a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
			<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form> -->
    </div>
  </nav>
</template>

<script>

export default {

	name: 'Navbar',

	data: function () {

		return { };

	}

};

</script>

<style scoped>
.dropdown-menu > .dropdown-item:not(.active):hover {
    background-color: lightgray;
}
</style>

