<template>
  <div>
    <div>
      <h2>All cookies</h2>
      {{ cookies }}
    </div>

    <div>
      <h2>Get cookie</h2>
      {{ getCookie("auth") }}
    </div>

    <div>
      <h2>Get cookies</h2>
      {{ getCookies }}
    </div>

    <div>
      <h2>Set cookie</h2>
      <input type="text" v-model.trim="newCookie.key" placeholder="key" />
      <input type="text" v-model.trim="newCookie.value" placeholder="value" />
      <button @click="add">add cookie</button>
    </div>

    <div>
      <h2>Delete cookie</h2>
      <input type="text" v-model.trim="deleteCookieKey" placeholder="key" />
      <button @click="deleteCookieFunc">delete cookie</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import useCookies from "../src";

const { cookies, setCookie, getCookie, getCookies, deleteCookie } =
  useCookies();

const newCookie = reactive({
  key: "",
  value: "",
});
const add = () => {
  setCookie(newCookie, {
    path: "/",
    expires: new Date(),
    secure: true,
  });
  Object.keys(newCookie).forEach((field) => {
    newCookie[field as "key" | "value"] = "";
  });
};

const deleteCookieKey = ref("");
const deleteCookieFunc = () => {
  deleteCookie(deleteCookieKey.value);
  deleteCookieKey.value = "";
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
