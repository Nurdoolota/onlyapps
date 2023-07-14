<template>
  <div class="courses">
    <modal-window
      v-if="isModalVisible"
      @closeModalWindow="clearData"
      title="Создание курса"
    >
      <template v-slot:default>
        <ValidationObserver ref="observer">
          <form @submit.prevent="upload" class="form" method="post">
            <ValidationProvider class="form__validator" v-slot="{ errors }">
              <input
                type="file"
                rules="file"
                @change="fileChange($event)"
                id="file-input"
              />
              <span>{{ errors[0] }}</span>
              <img :src="previewImage" alt="" />
            </ValidationProvider>
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
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataSend.deadline" label="Описание" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </template>
      <template v-slot:footer>
        <form-button label="Создать" @click="validateAndCreate" type="submit" />
      </template>
    </modal-window>
    <div class="personal">
      <div class="personal__info">
        <div class="personal__image">
          <img src="../assets/smesharik.png" alt="" />
          <a href="#" class="editor-image">
            <img src="../assets/pencil.svg" alt="" />
          </a>
        </div>
        <div class="personal__name">afds faslk</div>
        <div class="personal__date_of_registration">24/42/3</div>
        <div class="personal__inpu">
          <form-input placeholderInput="email" class="personal__input" />
          <form-input placeholderInput="group" class="personal__input" />
          <form-input placeholderInput="direction" class="personal__input" />
        </div>

        <!-- <div class="personal__email"></div>
      <div class="personal__group"></div>
      <div class="personal__direction"></div> -->
      </div>
      <div class="personal__courses"></div>
    </div>

    <form-button
      class="courses__button"
      @click="$router.push({ name: 'courses' })"
      label="Курсы"
    />
    <form-button
      v-if="role !== `USER`"
      class="courses__button"
      @click="openModal"
      label="Создать курс"
    />

    <form-button @click="$router.push({ name: 'admin' })" label="Админка" />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import FormInput from "@/components/FormInput.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import mixCourses from "@/mixins/mixCourses";
import mixModal from "@/mixins/mixModal";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    FormButton,
    ModalWindow,
    FormInput,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [mixCourses, mixModal],
  data() {
    return {
      dataSend: {
        name: "",
        description: "",
        deadline: "",
      },
      FILE: null,
      previewImage: null,
    };
  },
  computed: {
    ...mapGetters("mAuth", ["getUser"]),
    role() {
      return this.getUser.role;
    },
  },
  methods: {
    ...mapActions("mReq", ["sendRequest"]),
    clearData() {
      this.name = "";
      this.description = "";
      this.FILE = null;
      this.closeModal();
    },
    async validateAndCreate() {
      const success = await this.$refs.observer.validate();
      if (success && this.FILE) this.upload(this.dataSend, this.FILE);
    },
    async upload(dataSend, FILE, id = null) {
      try {
        if (id === null) {
          const courseData = await this.sendRequest({
            request: "POST",
            url: "subjects",
            data: dataSend,
          });
          const courseId = await courseData.json();
          id = courseId.id;
        } else await this.sendRequest("PATCH", `subjects/${id}`, dataSend);

        const response = await fetch(
          `${process.env.VUE_APP_BACKEND_URL}photo`,
          {
            method: "POST",
            credentials: "include",
            headers: {},
            body: FILE,
          }
        );

        if (response.ok) {
          this.closeModal();
          console.log(response);
        } else {
          throw new Error("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error(error);
        this.error = error;
      }
    },
    fileChange(event) {
      let data = new FormData();
      let file = event.target.files[0];
      data.append("file", file);
      this.FILE = data;
    },
  },
};
</script>

<style scoped>
.courses {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses__title {
  margin: 0px 0px 10px 0px;
}
.courses__button {
  margin: 0px 0px 10px 0px;
}
.courses__list {
}
.courses__item {
}

.courses__item:not(:last-child) {
  margin: 0px 0px 10px 0px;
}
.personal {
  display: flex;
  padding: 60px 120px;
}
.personal__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  flex-shrink: 0;
  width: 420px;
  margin-right: 50px;
  padding: 40px 42px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.personal__courses {
  display: inline-flex;
  padding: 40px 74px 68px 75px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--white, #fff);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
  width: 580px;
  background-color: yellow;
}

.personal__image {
  position: relative;
  width: 220px;
  height: 220px;
}

.personal__image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.editor-image {
  position: absolute;
  right: 0;
  top: 5px;
  border-radius: 50%;
  /* background-color: black; */
}

.personal__name {
  margin-top: 40px;
  color: #000;
  font-family: Gadugi;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.personal__date_of_registration {
  margin: 10px 0 10px 0;
  padding: 10px 15px;
  align-items: center;
  border-radius: 100px;
  background: rgba(130, 219, 218, 0.2);
  color: var(--black-blue, #202430);
  font-family: Gadugi;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.personal__input {
  margin-top: 20px;
}
</style>
