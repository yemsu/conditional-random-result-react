const store = {
  state: {},
  mutations: {},
  actions: {
    get: (storageName: string) => {
      const data = localStorage.getItem(storageName)
      if(!data) return null
      return JSON.parse(data)
    },
    save: <Data>(storageName: string, data: Data) => {
      localStorage.setItem(storageName, JSON.stringify(data))
    },
    delete: (storageName: string) => {
      localStorage.removeItem(storageName)
    }
  }
}

export default store