export function setCookie<T>(
  name: string,
  value: object,
  expireDays: number
): T | undefined {
  let date = new Date();
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();

  document.cookie =
    name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";

  return getLocalCookie<T>(name, document.cookie);
}

export function getLocalCookie<T>(
  name: string,
  cookies?: string | null
): T | undefined {
  return getCookie<T>(name, cookies ?? document.cookie);
}

export function getCookie<T>(name: string, allCookies: string): T | undefined {
  if (!allCookies) return undefined;

  var match = allCookies.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? <T>JSON.parse(match[2] ?? "") : undefined;
}

export function removeLocalCookie(name: string) {
  setCookie(name, {}, -1);
}
