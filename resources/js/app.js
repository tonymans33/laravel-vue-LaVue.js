/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


/*swal functions*/
import swal from 'sweetalert2';
window.swal = swal;

const toast = swal;
window.toast = toast;

const deleteSwal = swal;
window.deleteSwal = deleteSwal;

const deletedSwal = swal;
window.deletedSwal = deletedSwal;
/*end of swal functions*/


/*other functions and imports*/
import {Form, HasError, AlertError} from 'vform';
window.Form = Form;

import moment from 'moment';
window.Vue = require('vue');

window.Fire = new Vue();
/*end of other functions*/


/*vue routers setup */
import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
    { path : '/dashboard' , component : require('./components/Dashboard').default},
    { path : '/users' , component : require('./components/Users').default},
    { path : '/profile' , component : require('./components/Profile').default}
];

const router = new VueRouter({
    mode : 'history',
    routes
});

/*end of vue routes*/

/*progress bar*/
import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
    color : 'rgb(92, 184, 92)',
    failedColor : 'red',
    height : '2px'
});
/* end of progress bar*/





/*vue filters functions */
Vue.filter('uptext', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY')
});
/* end vue filters functions */


/*animation*/
$(document).ready(function () {
    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: true
    });
});
/*end animation*/


/*vue components*/
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
/* end vue components*/


/*creating the vue app*/
const app = new Vue({
    el: '#app',
    router
});
