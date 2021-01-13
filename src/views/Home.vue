<template>
  <div class="home">
    <nav class="level">
      <div class="level-item">
        Blood sugar density
        <BloodSugarDensity v-if="hasBloodSugars" v-bind:bloodSugars="bloodSugars"/>
        <BloodSugarHistogram v-if="hasBloodSugars" v-bind:bloodSugars="bloodSugars"/>
        <progress v-else class="progress is-small is-primary" max="100">15%</progress>
        <progress class="progress is-small is-primary" max="100">15%</progress>
      </div>
    </nav>
    <LoginButton />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginButton from '@/components/LoginButton.vue'
import BloodSugarDensity from '@/components/BloodSugarDensity.vue'
import BloodSugarHistogram from '@/components/BloodSugarHistogram.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    LoginButton,
    BloodSugarDensity,
    BloodSugarHistogram
  },
  data: function() {
    return {
      bloodSugars: []
    }
  },
  methods: {
    fetchBloodSugars: function() {
      const self = this
      axios.get(`${process.env.VUE_APP_API_URL}/blood-sugar-counts`).then(function(response) {
        self.bloodSugars = response.data
      });
    }
  },
  mounted: function() {
    this.fetchBloodSugars()
  },
  computed: {
    hasBloodSugars: function() {
      return this.bloodSugars.length > 0;
    }
  }
}
</script>
