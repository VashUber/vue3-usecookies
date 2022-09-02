import { ref, computed } from "vue";
import { options } from "./types";

const regexTemplate = "(?<={key}=).*?(?=(;|$))";
const cookies = ref(document.cookie);

const useCookies = () => {
  const getCookie = (key: string) =>
    computed(
      () =>
        cookies.value.match(
          new RegExp(regexTemplate.replace("{key}", key))
        )?.[0]
    );

  const getCookies = computed(() => {
    return cookies.value.split("; ").map((cookie) => {
      const [key, value] = cookie.split("=");

      return {
        [key]: value,
      };
    });
  });

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
        newCookie += `; ${option}=${value}`;
      });
    }
    document.cookie = newCookie;
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
