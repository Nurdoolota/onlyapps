<template>
  <div class="authorization">
    <div class="authorization__container">
      <div class="registration-block">
        <div class="registration-block__title">
          <p>Ещё нет аккаунта?</p>
          <p>Пожалуйста, введите свои данные ниже для регистрации на сайте</p>
        </div>
        <form-button
          class="registration-block__button"
          @click="$router.push({ name: 'registration' })"
          label="Регистрация"
          classButton="button_white"
        />
      </div>
      <div class="authorization-block">
        <div class="authorization-block__header">
          <h3>Добро пожаловать!</h3>
          <p>Введите свои данные для входа в аккаунт</p>
        </div>
        <div class="authorization-block__main">
          <ValidationObserver ref="observer">
            <form
              class="authorization-block__form"
              @submit.prevent
              method="post"
            >
              <ValidationProvider
                class="form__validator"
                rules="required"
                v-slot="{ errors }"
              >
                <form-input
                  class="authorization-block__input"
                  type="email"
                  v-model.trim="dataAuth.email"
                  placeholderInput="Email"
                />
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                class="form__validator"
                rules="required"
                v-slot="{ errors }"
              >
                <form-input
                  class="authorization-block__input"
                  v-model.trim="dataAuth.password"
                  type="password"
                  placeholderInput="Пароль"
                />
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>

              <p v-if="error" class="error-message">{{ error }}</p>
            </form>
          </ValidationObserver>
        </div>
        <div class="authorization-block__footer">
          <form-button
            class="authorization-block__button"
            classButton="button__blue-white button_auth"
            @click="validate"
            label="Войти"
          />
          <a href="">Забыли пароль?</a>
        </div>
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
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  data() {
    return {
      dataAuth: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    ...mapActions("mAuth", ["login"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) {
        await this.login(this.dataAuth);
      }
    },
  },
};
</script>

<style scoped>
.authorization {
  padding: 110px 0px;
}

.authorization__container {
  display: flex;
  justify-content: space-between;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.registration-block__title {
  margin: 0px 0px 30px 0px;
}

.registration-block {
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

.registration-block__title h3 {
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
}

.registration-block__title p {
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
}

.authorization-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
}

.registration-block {
}
.registration-block__title {
}
.registration-block__button {
}
.authorization-block {
}
.authorization-block__header {
  margin: 0px 0px 40px 0px;
  text-align: center;
}
.authorization-block__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px 43px 0px;
}
.authorization-block__form {
}
.form__validator {
}

.authorization-block__input {
  flex: 1 1 284px;
}
.authorization-block__input:not(:last-child) {
  margin: 0px 0px 20px 0px;
}
.error {
}
.error-message {
}
.authorization-block__footer {
  text-align: center;
}
.authorization-block__button {
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
