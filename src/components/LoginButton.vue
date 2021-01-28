<template>
  <div class="login-button">
    <PrimaryButton @click="login">Log into Dexcom</PrimaryButton>
    <span v-if="wasRedirected">I was redirected</span>
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  name: 'LoginButton',
  data: () => {
    return {
      wasRedirected: false
    }
  },
  mounted: function() {
    console.log('LoginButton mounted');
  },
  methods: {
    async login() {
      console.log('clicked login button');
      const clientId = `${process.env.VUE_APP_OAUTH_CLIENT_ID}`
      const redirectURI = `${process.env.VUE_APP_OAUTH_REDIRECT_URI}`
      window.location.href = `https://api.dexcom.com/v2/oauth2/login?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=offline_access`
    }
  }
}
</script>
