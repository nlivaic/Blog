import Cookies from "js-cookie";

export const xsrfToken = () =>
  //document.cookie.split(",").find(c => c.startsWith("X-CSRF-TOKEN"));
  Cookies.get("CSRF-REQUEST-TOKEN");

// export const xsrfToken = () => {
//   debugger;
//   document.cookie.split(",").find(c => c.startsWith("X-CSRF-TOKEN"));
// };
