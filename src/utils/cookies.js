export function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(
    value
  )};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        const cookieValue = c.substring(nameEQ.length, c.length);
        // Decode URL encoding trước khi parse JSON
        const decodedValue = decodeURIComponent(cookieValue);
        return JSON.parse(decodedValue);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
