<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__menu">
        <div class="header__logo">
          <h2><span>o</span>nly apps</h2>
        </div>
        <ul class="header__body">
          <li class="header__item">
            <a href="" class="header__link">Курсы</a>
          </li>
          <li class="header__item">
            <a href="" class="header__link"> О компании</a>
          </li>
          <li class="header__item">
            <!-- <div class="header__avatar">
              <img
                class="header__image"
                src="D:/vue/zxc/src/assets/smesharik.png"
                alt=""
              />
            </div> -->
            <a
              class="header__link"
              @click.prevent="$router.push({ name: 'personal' })"
              href=""
              >{{ getUser.name }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  name: "HeaderElement",
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
  },
};
</script>
<style scoped>
.header {
  background: #ffffff;
}
.header__container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
}
.header__menu {
  display: flex;
  width: 100%;
}
.header__logo {
  flex: 1 1 auto;
}
.header__body {
  display: flex;
  align-items: center;
  gap: 50px;
}
.header__item {
}
.header__link {
}

.header__avatar {
}
.header__image {
  width: 100%;
}

header {
}

nav h2 span {
  color: blue;
}
</style>
