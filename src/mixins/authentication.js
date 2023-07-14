export default {
  methods: {
    async sendRequest(requestType, url, data = {}) {
      const requestOptions = {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      if (requestType === "POST") {
        requestOptions.body = JSON.stringify(data);
        console.log(data);
      }

      return fetch(url, requestOptions);
    },
  },
};
