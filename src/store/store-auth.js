import { LocalStorage, Loading } from 'quasar';
import { firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const $state = {
  loggedIn: false,
};

const $mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
};

const $actions = {
  // eslint-disable-next-line no-empty-pattern
  registerUser({}, payload) {
    Loading.show();
    return firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .finally(() => {
        Loading.hide();
      })
      .catch((error) => {
        showErrorMessage(error.message);
        throw error; // rethrow for component to catch
      });
  },
  // eslint-disable-next-line no-empty-pattern
  loginUser({}, payload) {
    Loading.show();
    return firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .finally(() => {
        Loading.hide();
      })
      .catch((error) => {
        showErrorMessage(error.message);
        throw error;
      });
  },

  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        commit('setLoggedIn', true);
        LocalStorage.set('loggedIn', true);
        dispatch('tasks/fbReadData', null, { root: true });
      } else {
        commit('tasks/clearTasks', null, { root: true });
        commit('tasks/setTasksDownloaded', false, { root: true });
        commit('setLoggedIn', false);
        LocalStorage.set('loggedIn', false);
      }
    });
  },
};

export default {
  namespaced: true,
  state: $state,
  mutations: $mutations,
  actions: $actions,
};
