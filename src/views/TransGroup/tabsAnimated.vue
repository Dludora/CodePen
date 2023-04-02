<template>
  <div class="container">
    <div class="tabs">
      <div class="menu">
        <div class="menu__item menu__item--first" :class="{'is-active': active === 0}" @click="active=0">First</div>
        <div class="menu__item menu__item--second" :class="{'is-active': active === 1}" @click="active=1">Second</div>
        <div class="menu__item menu__item--third" :class="{'is-active': active === 2}" @click="active=2">Third</div>
        <div class="menu__line" :class="className"></div>
      </div>
      <div class="contents">
        <transition name="content" mode="out-in">
          <div class="contents__content" v-if="active === 0" key="0">
            <span>
              <i>
                <Build/>
              </i>
            </span>
            <h2>First Section</h2>
            <p>Quasi dignissimos eos ea hic impedit ipsum, aliquam nihil laborum ad, esse consequatur, delectus
              minus!</p>
            <button>Learn more</button>
          </div>

          <div class="contents__content" v-else-if="active === 1" key="1">
            <span><i>
              <Flash/>
            </i></span>
            <h2>Second Section</h2>
            <p>Molestiae dolore itaque at dolor, odio blanditiis sequi, tempore illum doloremque repellat dolores
              deserunt debitis, rem eaque! Magnam placeat esse vero quisquam!</p>
            <button>Learn more</button>
          </div>

          <div class="contents__content" v-else-if="active === 2" key="2">
            <span><i>
              <LockClosed/>
            </i></span>
            <h2>Thirst Section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, cum maxime reprehenderit quisquam
              ratione eaque veritatis perspiciatis totam.</p>
            <button>Learn more</button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {Build, Flash, LockClosed} from '@vicons/ionicons5'

const active = ref<number>(0)
const className = computed(() => {
  if (active.value === 0) {
    return 'active-first'
  } else if (active.value === 1) {
    return 'active-second'
  } else {
    return 'active-third'
  }
})

</script>

<style scoped lang="scss">
$primary-light: #e9d9ff;
$primary: #643cf5;
$greyLight: #9ea9d6;
$greyLight-2: #c8d1f5;
$greyDark: #5a6181;

*, *:after, *:before {
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $greyLight;

  .tabs {
    width: 32rem;
    display: flex;
    flex-direction: column;

    .menu {
      display: flex;
      justify-content: space-between;
      width: 28rem;
      margin: 0 auto;
      position: relative;

      .is-active {
        color: $primary;
      }

      &::after {
        content: '';
        width: inherit;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        background-color: $greyLight-2;
      }

      &__item {
        padding-bottom: .6rem;
        margin: 0 1.4rem;
        font-size: 1.4rem;
        cursor: pointer;
        font-weight: 500;

        &--first:hover {
          color: $primary;

          &:hover ~ .menu__line {
            transform: translateX(0);
            width: 6rem;
          }
        }

        &--second:hover {
          color: $primary;

          &:hover ~ .menu__line {
            transform: translateX(9.4rem);
            width: 8.2rem;
          }
        }

        &--third:hover {
          color: $primary;

          &:hover ~ .menu__line {
            transform: translateX(21rem);
            width: 7rem;
          }
        }
      }

      &__line {
        position: absolute;
        width: 6rem;
        height: 100%;
        left: 0;
        bottom: 0;
        border-bottom: 2px solid $primary;
        z-index: 200;
        transition: all 0.5s ease;
        pointer-events: none;

        &.active-second {
          transform: translateX(9.4rem);
          width: 8.2rem;
        }

        &.active-third {
          transform: translateX(21rem);
          width: 7rem;
        }
      }
    }

  }

  .contents {
    height: 20rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5rem;

        i {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 4rem;
          width: 4rem;
          background-color: $primary-light;
          border-radius: 10%;

          svg {
            color: $primary;
            height: 3rem;
            width: 3rem;
          }

        }
      }

      h2 {
        font-size: 1.6rem;
        color: $greyDark;
      }

      p {
        font-size: 1.2rem;
        margin: 1.6rem 0;
      }

      button {
        outline: none;
        border: none;
        color: $primary;
        background: none;
        cursor: pointer;
        font-size: 1.4rem;
        font-family: inherit;
        font-weight: 500;

        &:hover {
          border-bottom: 1px solid $primary;
        }
      }
    }
  }

}

.content-enter-from, .content-leave-to {
  opacity: 0;
}

.content-enter-active, .content-leave-active {
  transition: opacity .4s ease;
}

.content-enter-active {
  animation: slide-in .4s ease-in-out ;
}

.content-leave-active {
  animation: slide-out .4s ease-in-out ;
}
@keyframes slide-in {
  0% {
    transform: translateY(-2rem);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(2rem);
  }
}
</style>

<style>
#app, body, html {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>