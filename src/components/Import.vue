<template>
  <div id="import" class="container mx-auto">
    <h3>Import some data homes</h3>
    <div id="end-date">
      <h3>Choose start date</h3>
      <input type="date"  v-model="startDate"/>
    </div>
    <div>
      <h3>Choose end date</h3>
      <input type="date" v-model="endDate"/>
    </div>
    <div class="py-4" v-if="bloodSugarCount > 0">
      <p>Found {{ bloodSugarCount }} records. Proceed?</p>
      <PrimaryButton @click="importRange">Proceed</PrimaryButton>
    </div>
    <PrimaryButton @click="search">Search for blood sugar data</PrimaryButton>
  </div>
</template>

<script>
import * as axios from 'axios';
export default {
  data: function() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      bloodSugarCount: 0, 
    }
  },
  methods: {
    // TODO: Check if token is in local storage and error out if it isn't there
    // Or should this propogate up and tell the user to log in?
    search: function() {
      const self = this;
      axios.get(`${process.env.VUE_APP_API_URL}/dexcom/blood-sugars`, 
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.accessToken
          },
          params:
          {
            start_date: this.startDate,
            end_date: this.endDate
          }
        }).then((response) => {
          self.bloodSugarCount = response.data['count'];
        }).catch((error) => {
          // This will put something on the error channel hopefully
          console.log('oopsie', JSON.stringify(error));
        });
    },
    importRange: function() {
      const self = this;
      axios.post(`${process.env.VUE_APP_API_URL}/dexcom/import-range`, 
        { start_date: self.startDate, end_date: self.endDate },
        { 
          headers: {
            'Authorization': 'Bearer ' + localStorage.accessToken,
          },
        })
        .then((response) => {
          console.log('success' + response);
        })
        .catch((error) => {
          console.log('failure' + error);
        })
    },
  }
}
</script>
