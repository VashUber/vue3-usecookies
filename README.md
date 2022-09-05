# Vue3-useCookies

This package provide hook for comfortable usage cookies.

## Installation

    npm install vue3-usecookies

# Examples

Return reactive string with cookies

```js
const { cookies } = useCookies();
// 'auth=true'
```

Set cookie.

```js
const { setCookie } = useCookies();
setCookie(
  { key: "auth", value: true },
  {
    path: "/",
    expires: new Date(),
  }
);
```

Get cookie.

```js
const { getCookie } = useCookies();
const isAuth = JSON.parse(getCookie("auth"));
```

Return reactive object with all cookies.

```js
const { getCookies } = useCookies();
const cookies = getCookies();

// {auth: 'true'}
```

Delete cookie by key.

```js
const { deleteCookie } = useCookies();
deleteCookie("auth");
```
