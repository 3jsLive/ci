<!-- eslint-disable vue/no-v-html -->
<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
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
      <template v-if="currentRunId > 0">
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
              <pre class="dropdown-item-text">{{ ( quickInfo && quickInfo.author ) ? quickInfo.author.date : 'LOADING' }}</pre>
              <pre class="dropdown-item-text">{{ ( quickInfo && quickInfo.author ) ? quickInfo.author.name : 'LOADING' }}</pre>
              <pre class="dropdown-item-text">{{ ( quickInfo ) ? quickInfo.message : 'LOADING' }}</pre>
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
      </template>
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

import store from '@/src/store';

export default {

	name: 'Navbar',

	components: { },

	data() {

		return {};

	},

	computed: {

		quickInfo: function () {

			if ( this.$route.meta.skipAll !== true )
				return this.$store.getters.quickInfo( this.$route.params.run );
			else
				return {};

		},

		tests: function () {

			if ( this.$route.meta.skipAll !== true )
				return this.$store.getters.tests( this.$route.params.run );
			else
				return [];

		},

		currentRunId: function () {

			return this.$route.params.run;

		},

		testsByGroup: function () {

			if ( ! this.tests )
				return {};

			return this.tests.reduce( ( all, test ) => {

				all[ test.group ] = all[ test.group ] || [];
				all[ test.group ].push( test );
				all[ test.group ].sort( ( a, b ) => a.description.localeCompare( b.description ) );

				return all;

			}, {} );

		}

	},

	methods: {

		bracketize( val ) {

			if ( val )
				return val.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
			else
				return val;

		}

	},

	async beforeRouteUpdate( to, from, next ) {

		// Called when we go from /run/xxx/test/yyy?filename=foo to /run/xxx/test/yyy?filename=bar for example
		// The component doesn't get torn down and recreated, so no routing hooks

		console.log( 'NAVBAR beforeRouteUpdate 1-0', from.name, to.name, from.params.run, to.params.run );

		if ( to.params.run === from.params.run ) {

			console.log( 'same runId' );

			return next();

		} else {

			console.log( 'different runId', to.params.run, to.name );

			return await store.dispatch( 'pullRunData', { runId: to.params.run } )
				.then( foo => {

					if ( to.meta.skip ) {

						console.log( 'NAVBAR beforeRouteUpdate 1-1 done:', { foo } );
						return next();

					} else {

						return store.dispatch( 'pullTestData', { runId: to.params.run, currentTest: to.name } )
							.then( foo => {

								console.log( 'NAVBAR beforeRouteUpdate 1-2 done:', { foo } );
								return next();

							} );

					}

				} );
			// .then( () => store.dispatch( 'pullTestData', { runId: to.params.run, currentTest: to.name } ) )
			// .then( () => next() );

		}

		return next();

	},

	async beforeRouteEnter( to, from, next ) {

		if ( to.meta.skipAll === true )
			return next();

		if ( ! store.state.runInfo[ to.params.run ] ) {

			console.log( 'NAVBAR beforeRouteEnter 1-0: pulling data for', to.params.run );

			return await store.dispatch( 'pullRunData', { runId: to.params.run } )
				.then( foo => {

					if ( to.meta.skip ) {

						console.log( 'NAVBAR beforeRouteEnter 1-1 done:', { foo } );
						return next();

					} else {

						return store.dispatch( 'pullTestData', { runId: to.params.run, currentTest: to.name } )
							.then( foo => {

								console.log( 'NAVBAR beforeRouteEnter 1-2 done:', { foo } );
								return next();

							} );

					}

				} );

		}

		if ( ! to.meta.skip ) {

			if ( ! store.state.testData[ to.name ] || ! store.state.testData[ to.name ][ to.params.run ] ) {

				console.log( 'NAVBAR beforeRouteEnter 2-0: pulling test for', to.name, to.params.run );

				return store.dispatch( 'pullTestData', { runId: to.params.run, currentTest: to.name } )
					.then( foo => {

						console.log( 'NAVBAR beforeRouteEnter 2-1 done:', { foo } );
						return next();

					} );

			}

		}

		return next();

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

nav {
	margin-right: -15px;
    margin-left: -15px;
	padding: 0 1rem;
}
</style>

