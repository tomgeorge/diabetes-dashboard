import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./styles/styles.css"

Vue.config.productionTip = false

const requireComponent = require.context(
  './components/base-ui',
  true,
  /\.vue$/ 
);

console.log('requireComponent ' + requireComponent);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  console.log('filename before ' + fileName);
  const componentName = fileName
  // Remove the "./_" from the beginning
    .replace(/^\.\//, '')
  // Remove the file extension from the end
    .replace(/\.\w+$/, '')
  // Split up kebabs
    .split('-')
  // Upper case
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
  // Concatenated
    .join('')

  console.log('found component ' + componentName);

  Vue.component(componentName, componentConfig.default || componentConfig)
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
