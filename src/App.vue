<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('auth', ['loggedIn']),
  },
  watch: {
    loggedIn(val) {
      if (val) {
        this.$router.push('/');
      } else {
        this.$router.replace('/auth');
      }
    },
  },
  async mounted() {
    if (this.$q.platform.is.electron) {
      const electron = await import('electron');
      electron.ipcRenderer.on('show-settings', () => {
        this.$router.push('/settings');
      });
    }
    this.loadSettings();
    this.handleAuthStateChange();
  },
  methods: {
    ...mapActions('settings', ['loadSettings']),
    ...mapActions('auth', ['handleAuthStateChange']),
  },
  // eslint-disable-next-line no-dupe-keys, vue/order-in-components
  watch: {
    // eslint-disable-next-line func-names
    '$store.state.auth.loggedIn': function (isLoggedIn) {
      if (isLoggedIn) {
        this.$router.push('/');
      } else {
        this.$router.replace('/auth');
      }
    },
  },
};
</script>

<style>
.task-strikethrough {
  text-decoration: line-through;
}
</style>
