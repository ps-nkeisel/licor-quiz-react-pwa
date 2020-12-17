export function setTokenToLocalStorage(token, tokenExpiration) {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiration', tokenExpiration);
}
