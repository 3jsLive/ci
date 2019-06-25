<!-- eslint-disable vue/no-v-html -->
<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <!-- <a
      class="navbar-brand"
      href="#"
    >3ci</a> -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link
          to="/runs"
          class="nav-link"
        >
          Home
        </router-link>
      </li>
      <li class="nav-item dropdown ml-3 border-1 border-left pl-3">
        <a
          id="navbarDropdownChecks"
          class="nav-link dropdown-toggle navbar-text text-warning"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ ( currentRunId > 0 ) ? `Run: #${currentRunId}` : 'Run: #---' }}
        </a>
        <div
          class="dropdown-menu"
          aria-labelledby="navbarDropdownChecks"
          style="width: 400%"
        >
          <template v-if="quickInfo">
            <span class="ml-2">
              Based on the following git commit
            </span>
            <div class="dropdown-divider" />
            <pre class="dropdown-item-text">{{ quickInfo.author.date }}</pre>
            <pre class="dropdown-item-text">{{ quickInfo.author.name }}</pre>
            <pre class="dropdown-item-text">{{ quickInfo.message }}</pre>
          </template>
        </div>
      </li>
      <li class="nav-item">
        <router-link
          :to="`/runs/${currentRunId}`"
          class="nav-link"
        >
          Overview
        </router-link>
      </li>
      <template v-for="group of Object.keys( testsByGroup )">
        <li
          :key="group"
          class="nav-item dropdown"
        >
          <a
            id="navbarDropdownChecks"
            class="nav-link dropdown-toggle text-white text-capitalize"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ group }}
          </a>
          <div
            class="dropdown-menu"
            :aria-labelledby="`navbarDropdown${group}`"
          >
            <router-link
              :to="`/runs/${currentRunId}/${group}`"
              class="dropdown-item disabled"
            >
              Summary
            </router-link>
            <div class="dropdown-divider" />
            <template v-for="( test ) of testsByGroup[ group ]">
              <router-link
                v-if="test.status !== 'off'"
                :key="test.name"
                :to="`/runs/${currentRunId}/${group}/${test.name}`"
                class="dropdown-item"

                v-html="`${bracketize( test.description )}<br><em class='small'>${test.text || ''}</em>`"
              /><span
                v-else
                :key="test.name"
                class="dropdown-item disabled"
                v-html="`${bracketize( test.description )}<br><em class='small'>${test.text || ''}</em>`"
              />
            </template>
          </div>
        </li>
      </template>
      <!-- <li class="nav-item dropdown">
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
          <router-link
            class="dropdown-item"
            to="/linterDoobsDoc"
          >
            doobsDoc
          </router-link>
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
          >ESLint (JS)</a>
          <a
            class="dropdown-item disabled"
            href="#"
          >ESLint (TS)</a>
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
      </li> -->
      <li class="border-1 border-left ml-3 pl-3 nav-item">
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
  </nav>
</template>

<script>

// import VueBootstrapTypeahead from './VueBootstrapTypeahead';
import { mapGetters } from 'vuex';


export default {

	name: 'Navbar',

	components: {
		// VueBootstrapTypeahead
	},

	data() {

		return {};

	},

	computed: {

		...mapGetters( [
			'currentRunId',
			'tests',
			'quickInfo'
		] ),

		testsByGroup: function () {

			if ( ! this.tests )
				return {};

			return this.tests.reduce( ( all, test ) => {

				all[ test.group ] = all[ test.group ] || [];
				all[ test.group ].push( test );

				return all;

			}, {} );

		}

	},

	created() {

		this.$store.dispatch( 'pullRunData' );

	},

	methods: {

		bracketize( val ) {

			if ( val )
				return val.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
			else
				return val;

		}

	}

};

</script>

<style scoped>
.dropdown-menu > .dropdown-item:not(.active):hover {
    background-color: lightgray;
}
.dropdown-menu > .dropdown-item.disabled {
    color: lightgray;
}
</style>

