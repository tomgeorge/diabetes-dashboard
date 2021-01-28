<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/import">Import</router-link> |
      <router-link to="/tailwind-examples"> Mess around with components here</router-link>
      <Redirect @received-access-code="onReceivedAccessCode" @error-getting-access-token="onErrorGettingAccessToken" />
      <div v-if="accessCodeError && !accessCodeErrorAcknowledged" class="notification is-danger">
        <button class="delete" @click="acknowledgeError"></button>
        There was an error getting the token from the server.  The server returned: {{ accessCodeErrorObject }}
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Redirect from '@/components/Redirect.vue';
import * as axios from 'axios';

export default {
  components: {
    Redirect
  },
  mounted: function() {
    console.log('App.vue mounted');
  },
  computed: {
    receivedAccessToken: () => {
      return this.accessToken != '';
    }
  },
  data: () => {
    return {
      accessToken: '',
      accessCodeError: false,
      accessCodeErrorObject: {},
      accessCodeErrorAcknowledged: false
    }
  },
  methods: {
    onReceivedAccessCode: function(code) {
      this.requestAccessToken(code);
    },
    onErrorGettingAccessToken: function() {
      this.accessCodeError = true;
      this.accessCodeErrorAcknowledged = false;
    },
    acknowledgeError: function() {
      this.accessCodeErrorAcknowledged = true;
    },
    requestAccessToken: function(code) {
      const self = this;
      axios.post(`${process.env.VUE_APP_API_URL}/request-access-token`, 
        {
          responseCode: code,
        },
        { 
          headers: {'Content-Type': 'application/json'}
        }).then((response) => {
          console.log(JSON.stringify(response));
          if (response.status == 200) {
            self.accessToken = response.data['access_token'];
            localStorage.accessToken = self.accessToken;
            console.log('received access token from server');
          } else {
            self.accessCodeError = true;
            self.accessCodeErrorObject = response.data;
          }
        })
        .catch((err) => {
            self.accessCodeError = true;
            self.accessCodeErrorObject = err.response.data;
        });
    }
  },
  errorCaptured: function(err) {
    console.log('caught error', err)
    return false;
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
