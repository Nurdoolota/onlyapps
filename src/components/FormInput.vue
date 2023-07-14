<template>
  <div class="form-input">
    <input
      class="form-input__input"
      :value="value"
      @input="input"
      :type="type"
      :placeholder="placeholderInput"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholderInput: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.form-input {
}
.form-input__input {
  display: flex;
  padding: 17px 25px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: #212529;
  background-color: #fff;
  border-radius: 100px;
  box-shadow: 1px 1px 100px 0px rgba(0, 0, 0, 0.08);
}

.text-field__input {
}
</style>
