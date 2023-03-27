<template>

  <div class="rocket-area">
    <img
        class="rocket"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/rocket.svg"
        alt="Rocket ship"
    />
  </div>
  <div class="controls-area">
    <div>
      <h1>Control Panel</h1>
      <label for="speed">Speed</label>
      <input name="speed" type="range" min="1" max="11" v-model="speed"/>
      <label for="upDown">Up / Down</label>
      <input name="upDown" type="range" min="0" max="100" v-model="topDown"/>

      <label for="leftRight">Left / Right</label>
      <input name="leftRight" type="range" max="100" v-model="leftRight"/>

      <label for="scale">Scale</label>
      <input name="scale" type="range" min="50" max="200" v-model="height"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, type Ref, ref} from "vue";

const height: Ref<number> = ref(100)
const speed: Ref<number> = ref(0)
const topDown: Ref<number> = ref(50)
const leftRight: Ref<number> = ref(50)

const css_leftRight = computed(() => {
  return leftRight.value + "%";
})
const css_topDown = computed(() => {
  return topDown.value + '%';
})
const background_speed = computed(() => {
  return 4 / speed.value + "s";
})
const scale = computed(() => {
  return height.value + "px";
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 2rem;
  height: 100vh;
  font-family: Roboto, sans-serif;
}

#app {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.rocket-area {
  position: relative;
  background: #222;
  background-image: radial-gradient(
          2px 2px at 20px 30px,
          #eee,
          rgba(0, 0, 0, 0)
  ),
  radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
  radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0, 0, 0, 0)),
  radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
  radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
  radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  background-size: 200px 200px;
  border: 5px solid #ddd;
  box-shadow: inset 0 0 12px black;
  border-radius: 16px;
  display: grid;
  animation: animate v-bind(background_speed) linear infinite;
  overflow: hidden;
}

@keyframes animate {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 0 100%;
  }
}

.rocket {
  position: absolute;
  left: v-bind(css_leftRight);
  top: v-bind(css_topDown);
  height: v-bind(scale);
}

.controls-area {
  background: #ffe082 url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/brushed-alum.png);
  border-radius: 8px;
  border: 5px solid #ffd042;
  box-shadow: inset 0 0 3px rgba(black, 0.1);
  padding: 1rem;
  display: grid;
  place-items: center;
  text-align: center;

  h1 {
    text-transform: uppercase;
    font-size: 1.2rem;
  }

  input {
    width: 100%;
  }
}
</style>
