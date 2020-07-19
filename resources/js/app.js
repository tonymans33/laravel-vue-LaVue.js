/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import VueRouter from "vue-router";
import {Form, HasError, AlertError} from 'vform';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';

window.Vue = require('vue');
window.Form = Form;

Vue.use(VueRouter);

Vue.use(VueProgressBar, {
    color : 'rgb(92, 184, 92)',
    failedColor : 'red',
    height : '2px'

});

let routes = [
    { path : '/dashboard' , component : require('./components/Dashboard').default},
    { path : '/users' , component : require('./components/Users').default},
    { path : '/profile' , component : require('./components/Profile').default}
];

const router = new VueRouter({
    mode : 'history',
    routes
});

Vue.filter('uptext', function(text){
    return text.toUpperCase();
});

Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY')
});



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
