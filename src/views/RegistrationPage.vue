<template>
  <div class="registration">
    <div class="registration__container">
      <div class="registration-block">
        <div class="registration-block__header">
          <h3>Добро пожаловать!</h3>
          <p>Пожалуйста, введите свои данные ниже для регистрации на сайте</p>
        </div>
        <div class="registration-block__main">
          <ValidationObserver ref="observer">
            <form
              class="registration-block__form"
              @submit.prevent
              method="post"
            >
              <ValidationProvider
                class="form__validator"
                rules="required"
                v-slot="{ errors }"
              >
                <form-input
                  class="registration-block__input"
                  v-model.trim="dataReg.name"
                  placeholderInput="Имя пользователя"
                />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                class="form__validator"
                rules="required"
                v-slot="{ errors }"
              >
                <form-input
                  class="registration-block__input"
                  type="email"
                  rules="required|email"
                  v-model.trim="dataReg.email"
                  placeholderInput="Email"
                />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                class="form__validator"
                rules="required|min:7"
                vid="confirmation"
                v-slot="{ errors }"
              >
                <form-input
                  class="registration-block__input"
                  v-model.trim="dataReg.password"
                  type="password"
                  placeholderInput="Пароль"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                class="form__validator"
                rules="required|confirmed:confirmation"
                v-slot="{ errors }"
              >
                <form-input
                  class="registration-block__input"
                  v-model.trim="confirmPassword"
                  type="password"
                  placeholderInput="Повторите пароль"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>

              <p v-if="error" class="error-message">{{ error }}</p>
            </form>
          </ValidationObserver>
        </div>
        <div class="registration-block__footer">
          <form-button
            class="registration-block__button"
            classButton="button__blue-white button_auth"
            @click="validate"
            label="Регистрация"
          />
          <a href="">Забыли пароль?</a>
        </div>
      </div>
      <div class="authorization-block">
        <div class="authorization-block__title">
          <p>Уже есть аккаунт?</p>
          <p>Введите свои данные для входа в аккаунт</p>
        </div>
        <form-button
          class="authorization-block__button"
          @click="$router.push({ name: 'authorization' })"
          label="Войти"
          classButton="button_white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import { mapActions } from "vuex";

export default {
  name: "RegistrationPage",
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  data() {
    return {
      dataReg: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    ...mapActions("mAuth", ["register"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) {
        await this.register(this.dataReg);
      }
    },
  },
};
</script>

<style scoped>
.registration {
  padding: 110px 0px;
}

.registration__container {
  display: flex;
  justify-content: space-between;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.authorization-block__title {
  margin: 0px 0px 30px 0px;
}

.authorization-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 1 479px;
  height: 660px;
  padding: 95px;
  border-radius: 100px;
  background-color: #4640de;
  color: white;
  margin: 0px 15px 0px 0px;
}

.authorization-block__title h3 {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
}

.authorization-block__title p {
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
}

.registration-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
}

.authorization-block {
}
.authorization-block__title {
}
.authorization-block__button {
}
.registration-block {
}
.registration-block__header {
  margin: 0px 0px 40px 0px;
  text-align: center;
}
.registration-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 43px 0px;
}
.registration-block__form {
}
.form__validator {
}

.registration-block__input {
  flex: 1 1 284px;
}
.registration-block__input:not(:last-child) {
  margin: 0px 0px 20px 0px;
}
.error {
}
.error-message {
}
.registration-block__footer {
  text-align: center;
}
.registration-block__button {
  margin: 0px 0px 23px 0px;
}

.form-input__title {
  text-align: center;
  margin-bottom: 40px;
}

.form-input__title h3 {
  font-family: Gadugi;
  font-size: 30px;
  font-weight: 700;
  line-height: 40px;
  margin: 0px 0px 10px 0px;
}

.form-input__title p {
  /* margin: 10px 0 30px 0; */
  font-family: Gadugi;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #202430;
  opacity: 70%;
}

.button__auth {
  margin-top: 20px;
}
</style>
