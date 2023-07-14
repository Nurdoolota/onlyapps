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
          <a href="#" class="editor-image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
            >
              <g filter="url(#filter0_d_17_263)">
                <rect x="9" y="9" width="36" height="36" rx="18" fill="white" />
                <path
                  d="M33.27 24.4137L29.5493 20.7315L30.775 19.5041C31.1106 19.168 31.5229 19 32.012 19C32.5011 19 32.9132 19.168 33.2482 19.5041L34.4738 20.7315C34.8094 21.0676 34.9845 21.4732 34.9991 21.9484C35.0137 22.4236 34.8532 22.8289 34.5176 23.1644L33.27 24.4137ZM32.0006 25.7068L22.7207 35H19V31.274L28.2799 21.9808L32.0006 25.7068Z"
                  fill="#4640DE"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_17_263"
                  x="0"
                  y="0"
                  width="56"
                  height="56"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="1" dy="1" />
                  <feGaussianBlur stdDeviation="5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_17_263"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_17_263"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
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
  border-radius: 50%;
  background: url(https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png),
    lightgray -86.705px -0.028px / 154.915% 100.024% no-repeat;
}

.editor-image {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 36px;
  height: 36px;
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
