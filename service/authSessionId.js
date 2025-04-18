const userSessionIdMap = new Map()

export const setSessionId = (id, user) => {
  return userSessionIdMap.set(id, user)
}

export const getUserWithSessionId = (id) => {
  return userSessionIdMap.get(id)
}
