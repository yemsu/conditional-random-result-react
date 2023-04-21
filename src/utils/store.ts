import { OptionButtons } from "../types/common"

const RANDOM_RESULT_OPTIONS = 'RANDOM_RESULT_OPTIONS'
const RANDOM_RESULT_EXCEPTIONS = 'RANDOM_RESULT_EXCEPTIONS'

const store = {
  state: {},
  mutations: {},
  actions: {
    getSavedInputBadges: () => {
      return savedData.get(RANDOM_RESULT_OPTIONS)
    },
    saveInputBadges: (optionButtons: OptionButtons) => {
      return savedData.save(RANDOM_RESULT_OPTIONS, optionButtons)
    },
    deleteSavedInputBadges: () => {
      return savedData.delete(RANDOM_RESULT_OPTIONS)
    },
    getSavedExceptions: () => {
      return savedData.get(RANDOM_RESULT_EXCEPTIONS)
    },
    saveExceptions: (optionButtons: OptionButtons) => {
      return savedData.save(RANDOM_RESULT_EXCEPTIONS, optionButtons)
    },
    deleteSavedExceptions: () => {
      return savedData.delete(RANDOM_RESULT_EXCEPTIONS)
    },
  }
}

const savedData = {
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

export default store