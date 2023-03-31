<template>
  <div class="demo">
    <h1>
      Using Vue Transitions & CSS Animation to animate elements
    </h1>
    <div class="add">
      <button class="add-button" @click="addCard">
        <i aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <path
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
                fill="currentColor"></path>
          </svg>
        </i>
      </button>
    </div>
    <transition-group name="cardTransition" tag="div">
      <div
          class="card"
          v-for="(card, index) in cards"
          v-show="card.show"
          :key="card.name"
      >
        <span>
        {{ card.name }}
        </span>
        <button @click="remove(index)">
          <i>
            <Trash/>
          </i>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import {Trash} from '@vicons/ionicons5'
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
@import url('https://fonts.googleapis.com/css2?family=Muli:wght@700&display=swap');

*, *:before, *:after {
  box-sizing: border-box;
}

.demo {
  @media screen and (min-width: 43.75rem) {
    position: relative;
    max-width: 68rem;
    margin: 0 auto;
  }

  .add {
    display: flex;
    justify-content: right;
    align-items: center;

    margin-bottom: 10px;

    .add-button {
      border: none;
      outline: none;
      width: 6rem;
      height: 6rem;
      border-radius: 100%;
      background: #378E8A;
      color: #004240;
      cursor: pointer;

      &:hover {
        animation: rotate-center .6s ease-in-out;
        background: #E8F3F1;

      }

      @keyframes rotate-center {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      svg {
        width: 3rem;
      }
    }
  }

  .card {
    margin: 3rem 0;
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #95b1af;
    color: #334b4a;
    overflow: hidden;
    box-shadow: -1px 1px #004240, -2px 2px #004240, -3px 3px #004240, -4px 4px #004240, -5px 5px #004240, -6px 6px #004240, -7px 7px #004240, -8px 8px #004240;
    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }

    span {
      padding: 2rem;
    }

    button {
      color: #95b1af;
      background-color: #7e244c;
      border: none;
      outline: none;
      width: 10rem;
      padding: 2rem;
      cursor: pointer;

      &:hover {
        color: #eeeeee;
      }

      svg {
        width: 2.5rem;
      }
    }
  }
}

.cardTransition-enter-from {
  transform: scale(0.5);
  transition: transform 0.5s linear;
}

.cardTransition-enter-active {
  animation: scale-up-left .4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

.cardTransition-enter-to {
  animation: shadow-pop 0.3s ease-in-out both;
}

.cardTransition-leave-active,
.cardTransition-leave-to {
  transform: translateX(0);
  animation-name: wiggle;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
  transition: filter 1s linear;
}

@keyframes wiggle {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(5%);
  }
  50% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes scale-up-left {
  0% {
    transform: scale(0.5);
    transform-origin: 0 50%;
  }
  100% {
    transform: scale(1);
    transform-origin: 0 50%;
  }
}

@keyframes shadow-pop {
  0% {
    //box-shadow: 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e, 0 0 #3e3e3e;
    transform: translateX(0) translateY(0);
  }
  100% {
    //box-shadow: -1px 1px #3e3e3e, -2px 2px #3e3e3e, -3px 3px #3e3e3e, -4px 4px #3e3e3e, -5px 5px #3e3e3e, -6px 6px #3e3e3e, -7px 7px #3e3e3e, -8px 8px #3e3e3e;
    transform: translateX(8px) translateY(-8px);
  }
}

.cardTransition-move {
  transition: all 0.5s ease;
}


</style>

<style>
body {
  background: #0b706d;
  color: #004240;
  font: 1.6rem 'Muli', sans-serif;
}
</style>