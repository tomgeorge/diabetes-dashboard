<template>
  <div class="redirect"/>
</template>

<script>
export default {
  computed: {
    /** returns true when the access token is not empty */
    receivedAccessToken: () => {
      return this.accessToken != '';
    }
  },
  data: () => {
    return {
      oauthResponseCode: new URLSearchParams(window.location.search).get('code') ,
      accessToken: ''
    }
  },
  mounted: function() {
    if (this.oauthResponseCode != null) {
      console.log('Redirect emitting received-access-code');
      this.$emit('received-access-code', this.oauthResponseCode);
      this.$router.push('/');
    }
  },
  methods: {
  }
}
</script>
