<template>
  <div class="course">
    <modal-window
      v-if="isModalVisible"
      :course="selectedCourse"
      @closeModalWindow="closeSelectCourse"
      title="Изменение курса"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent class="form" method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.name" label="Название" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataSend.description"
                label="Описание"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button
          label="Изменить"
          @click="validateAndCreateCourse"
          type="submit"
        />
      </template>
    </modal-window>

    <div class="info">
      <div class="info__container">
        <div class="info__body">
          <div class="info__name">{{ course.name }}</div>
          <div class="info__description">{{ course.description }}</div>
          <div class="info__subscribers">{{ getSubscribers }}</div>
        </div>
        <div class="info__logo">
          <img
            :src="imageUrl"
            alt="Здесь должна быть картинка"
            class="info__image"
          />
        </div>
      </div>
    </div>
    <div class="main">
      <form-button
        class="courses__button"
        @click="subscribe"
        label="Подписаться"
      />
      <form-button
        v-if="getUser.role === `ADMIN`"
        class="courses__button"
        :course-id="course.id"
        @click="selectCourse"
        label="Изменить"
      />
    </div>
    <div class="teachers">
      <div class="teachers__container">
        <div class="teachers__title">Преподаватели</div>
        <div class="teachers__row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";
import FormButton from "@/components/FormButton";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    FormButton,
  },
  mixins: [mixCourses, mixModal],
  data() {
    return {
      course: null,
      subscribers: null,
      isSubscribed: false,
      imageUrl: "",
    };
  },
  mounted() {
    this.course = this.getCourse();
    this.getCourseImageUrl(this.$attrs.id);
    this.subscribers = this.getCourseInfo();
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    getSubscribers() {
      return this.getCourseInfo.length;
    },
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    // selectCourse(course) {
    //   this.selectedCourse = course;
    //   this.dataSend.name = this.selectedCourse.name;
    //   this.dataSend.description = this.selectedCourse.description;
    //   this.openModal();
    // },
    // closeSelectCourse() {
    //   this.selectedCourse = null;
    //   this.dataSend.name = "";
    //   this.dataSend.description = "";
    //   this.FILE = null;
    //   this.closeModal();
    // },
    getCourseImageUrl(id) {
      this.imageUrl = `${process.env.VUE_APP_BACKEND_URL}photo/${id}`;
    },
    async getCourse() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `subjects/${this.$attrs.id}`,
        });
        if (!response.ok) throw new Error("Ошибка при получении курса");
        this.course = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async subscribe() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscribe/${this.$attrs.id}`,
        });
        if (!response.ok) throw new Error("Не удалось подписаться на курс");
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseInfo() {
      try {
        const response = await this.sendRequest({
          request: "GET",
          url: `discipline-info/subscribers/${this.$attrs.id}`,
        });
        if (!response.ok)
          throw new Error("Не удалось получить информацию о курсе");
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.course {
  background-color: #82dbda;
  border-radius: 0px 0px 100px 100px;
}
.course__container {
}
.info {
  padding: 47px 0px;
}

.info__container {
  display: flex;
  justify-content: space-between;
}
.info__body {
}
.info__name {
  color: #202430;
  font-family: Gadugi;
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  margin: 0px 0px 20px 0px;
}
.info__description {
  color: #202430;
  font-family: Gadugi;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.info__logo {
  max-width: 164px;
  height: 162px;
  flex-shrink: 0;
}
.info__image {
  width: 100%;
}
.courses__button {
  display: block;
}
</style>
