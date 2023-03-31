<template>
  <div class="demo">
    <p style="text-align: center;">
      <button @click="addCard">
        Add Card
      </button>
    </p>
    <transition-group name="cardTransition" tag="div">
      <div
          class="card"
          v-for="(card, index) in cards"
          v-show="card.show"
          :key="card.name"
      >
        {{ card.name }}
        <button @click="remove(index)">
          <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/close-x-icon.svg"
              alt="Close"
          />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import {faker} from '@faker-js/faker'
import {onBeforeMount, onMounted, ref} from "vue"
import axios from "axios"
import {reactive, type Ref} from 'vue'

type Card = {
  name: string,
  show: boolean
}
const cards = reactive<Card[]>([])
const addCard = () => {
  const getRandomInt = (): number => {
    return Math.floor(Math.random() * cards.length)
  }
  cards.splice(getRandomInt(), 0, {
    name: faker.name.fullName(),
    show: true
  })
}
const remove = (index: number) => {
  cards[index].show = false
}

onBeforeMount(async () => {
  let data = await axios.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/cards-data.json")
  cards.push(...data.data.cards)
})
</script>

<style scoped lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  align-content: center;
  background: white;
  margin: 10px;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 0 #ccc;
  position: relative;

  button {
    border: 0;
    background: none;
    position: absolute;
    right: 10px;

    img {
      cursor: pointer;
      height: 15px;
      width: 15px;
    }
  }
}

.cardTransition-enter-from, .cardTransition-leave-to {
  opacity: 0;
  transform: translateX(500px);
}

.cardTransition-enter-active, .cardTransition-leave-active, .cardTransition-move {
  transition: all 0.5s ease;
}

.cardTransition-leave-active {
  position: absolute;
}

</style>

<style>
body {
  background: #eee;
  font: 800 100% system-ui;
}
</style>