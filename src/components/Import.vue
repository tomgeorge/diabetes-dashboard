<template>
  <div class="import">
    <h3>Import some data homes</h3>
    <div class="columns">
      <div class="column">
        <h3>Choose start date</h3>
        <v-date-picker v-model="startDate" id="start" class="mt-4" />
      </div>
      <div class="column">
        <h3>Choose end date</h3>
        <v-date-picker v-model="endDate" id="end" />
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="bloodSugars"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
    <button class="button is-primary" id="search" v-on:click="search">Search for blood sugar data</button>
  </div>
</template>

<script>
import * as axios from 'axios';
export default {
  data: function() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      headers: [{
        text: 'System Time',
        align: 'start',
        value: 'systemTime'
      }, 
        { text: 'Display Time', value: 'displayTime' }, 
        { text: 'Blood Sugar Value', value: 'value' },
        { text: 'Realtime Value', value: 'realtimeValue' },
        { text: 'Smoothed Value', value: 'smoothedValue' },
        { text: 'Status', value: 'status' },
        { text: 'Trend', value: 'trend' },
        { text: 'Trend Rate', value: 'trendRate' }
      ],
      bloodSugars: [
      ]
    }
  },
  computed: {
    hasBloodSugars: function() {
      console.log('computing hasBloodSugars');
      return this.bloodSugars.length > 0;
    } 
  },
  methods: {
    // TODO: Check if token is in local storage and error out if it isn't there
    search: function() {
      console.log('Searching for some blood sugarz ' + this.startDate + ' end ' + this.endDate);
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
          console.log('Got blood sugars from server');
          const returnedBloodSugars = response.data['egvs'];
          self.bloodSugars = returnedBloodSugars;
          console.log(self.bloodSugars);
        }).catch((error) => {
          console.log('oopsie', JSON.stringify(error));
        });
    }
  }

}
</script>
