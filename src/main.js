import { createApp } from 'vue'
import App from './App.vue'
import EchoLibrary from "laravel-echo"
// import Echo from "laravel-echo"

createApp(App).mount('#app')

window.Pusher = require('pusher-js');
window.Echo = new EchoLibrary({
    broadcaster: 'pusher',
    key: 'aa65326720cca1998709'
});
window.Echo.channel('notification')
    .listen('NotificationEvent', (e) => {
        console.log(e.user, e.chatMessage);
    });