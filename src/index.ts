import { ref, computed } from "vue";
import { options } from "./types";

const cookies = ref(document.cookie);
const getCookie = (key: string) => {
  const regexTemplate = `(?<=\\b${key}=).*?(?=(;|$))`;
  const regex = new RegExp(regexTemplate, "gmi");

  return computed(() => cookies.value.match(regex)?.[0]);
};
const getCookies = computed(() => {
  return cookies.value.split("; ").map((cookie) => {
    const [key, value] = cookie.split("=");

    return {
      [key]: value,
    };
  });
});

const useCookies = () => {
  const setCookie = (
    payload: {
      key: string;
      value: unknown;
    },
    options?: options
  ) => {
    const value =
      typeof payload.value !== "string"
        ? JSON.stringify(payload.value)
        : payload.value;
    let newCookie = `${payload.key}=${value}`;
    if (options) {
      Object.keys(options).forEach((option) => {
        const value = options[option as keyof options];
        newCookie += `;${option}=${value}`;
      });
    }
    document.cookie = `${newCookie}`;
    cookies.value = document.cookie;
  };

  const deleteCookie = (key: string) => {
    document.cookie = `${key}=`;
    cookies.value = document.cookie;
  };

  return {
    getCookie,
    getCookies,
    setCookie,
    cookies,
    deleteCookie,
  };
};

export default useCookies;
