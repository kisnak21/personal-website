export function verifyAdminKey(key) {
  return key
}

export function getStoredAdminKey() {
  return localStorage.getItem('admin_key')
}

export function storeAdminKey(key) {
  localStorage.setItem('admin_key', key)
}

export function clearAdminKey() {
  localStorage.removeItem('admin_key')
}
