<template>
  <div class="courses-wrapper">
    <div class="main">
      <div class="main__content">
        <h2 class="main__title">Lorem ipsum dolor sit amet</h2>
        <p class="main__text">
          Lorem ipsum dolor sit ametLorem ipsum dolor sit amet
        </p>
        <div class="search">
          <form-input v-model.trim="description" placeholderInput="поиск" />
          <form-button
            classButton="btn__blue-white"
            @click="$router.push({ name: 'personal' })"
            label="Поиск"
          />
        </div>
      </div>
    </div>
    <div class="courses-block">
      <div class="courses-filter">
        <div class="courses-filter__type">
          <h3>Тип</h3>
          <ul>
            <li>
              <input
                type="radio"
                value="man"
                checked
                name="gender"
              />Комбинированный
            </li>
            <li>
              <input type="radio" value="man" checked name="gender" />Лекции
            </li>
            <li>
              <input type="radio" value="man" checked name="gender" />Тесты
            </li>
          </ul>
        </div>
        <div class="courses-filter__subject">
          <h3>Тематика</h3>
          <ul>
            <li><input type="checkbox" checked name="html5" />Математика</li>
            <li>
              <input type="checkbox" checked name="html5" />Программирование
            </li>
            <li><input type="checkbox" checked name="html5" />История</li>
            <li>
              <input type="checkbox" checked name="html5" />Мобильная разработка
            </li>
            <li>
              <input type="checkbox" checked name="html5" />Английский язык
            </li>
            <li><input type="checkbox" checked name="html5" />Тестирование</li>
          </ul>
        </div>
      </div>

      <div class="courses__available">
        <h2 class="courses__title">Доступные курсы({{ courses.length }})</h2>
        <div>
          <div class="courses__list">
            <course-element
              class="courses__item"
              v-for="course in courses"
              :key="course.id"
              :course="course"
              :imageUrl="getCourseImageUrl(course.id)"
              @click="
                $router.push({
                  name: 'course',
                  params: { id: course.id },
                })
              "
            />
          </div>
          <h2 v-if="!courses.length" class="error-message">Курсов нету</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseElement from "@/components/CourseElement.vue";
import FormButton from "@/components/FormButton.vue";
import mixCourses from "@/mixins/mixCourses";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CourseElement,
    FormButton,
  },
  mixins: [mixCourses],
  data() {
    return {};
  },
  async mounted() {
    this.courses = await this.getCourses();
    await this.subscriptions();
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    async logOut() {
      try {
        const response = await this.sendRequest({
          request: "POST",
          url: "auth/log-out",
        });
        if (!response.ok) throw new Error("Ошибка при выходе");
        this.$router.push("/authorization");
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async getCourses() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: "subjects",
        });
        if (!response.ok) throw new Error("Ошибка при получении курсов");
        this.courses = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async subscriptions() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscriptions/${
            this.$store.dispatch("mAuth/getUser").id
          }`,
        });
        if (!response.ok) throw new Error("Не удалось подписаться на курс");
      } catch (error) {
        console.log(error);
      }
    },
    getCourseImageUrl(id) {
      return `${process.env.VUE_APP_BACKEND_URL}photo/${id}`;
    },
  },
};
</script>

<style scoped>
.courses-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* header */

/* main */
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  background-color: #77608d;
}
.main__content {
  z-index: 99;
  max-width: 40%;
  margin-left: 170px;
}
.main__title {
  margin-top: 15px;
  font-size: 64px;
  line-height: 85px;
  color: #202430;
}
.main__text {
  font-size: 20px;
  line-height: 27px;
  color: #20243080;
}
.search {
  display: flex;
  align-items: center;
  margin-top: 50px;
}
/* courses */
.courses-block {
  display: flex;
  justify-content: space-evenly;
  padding-top: 80px;
}

/* body */
.courses__title {
  margin: 0px 0px 40px 0px;
}
.courses__button {
  margin: 0px 0px 10px 0px;
}
.courses__list {
  display: flex;
  flex-wrap: wrap;
}
.courses__item {
  flex: 1 1 293px;
}

.courses__item:not(:last-child) {
  margin: 0px 0px 10px 0px;
}
</style>
