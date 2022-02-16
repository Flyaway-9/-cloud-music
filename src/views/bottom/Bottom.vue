<template>
  <footer class="bottom">
    <foot-audio></foot-audio>
    <foot-song-name></foot-song-name>
  </footer>
</template>

<script>
import FootAudio from './footaudio/FootAudio.vue'
import FootSongName from './footaudio/FootSongName.vue'
export default {
  name: 'Bottom',
  components: {
    FootAudio,
    FootSongName,
  }
}
</script>

<style>
.bottom {
  height: 100%;
  position: relative;
  background-color: #fff;
  z-index: 666;
}
</style>