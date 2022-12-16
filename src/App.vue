<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
  function getRandomArbitrary(min, max) {
    return String(Math.floor(Math.random() * (max - min) + min));
  }

//TODO: token = id for POST method
const socket = require('socket.io-client')('http://localhost:3000', { auth: {token: getRandomArbitrary(0, 10)} })

socket.on('connect', () => {
  console.log('IO connected', socket.id);

  socket.emit('message:created', socket.id)
})

socket.on('message:created', (message) => {
  console.log('new message: ', message);
})


socket.on('disconnect', () => {
  console.log('IO disconnect');
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
