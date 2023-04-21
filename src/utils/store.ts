import { OptionButtons } from "../types/common"

const RANDOM_RESULT_OPTIONS = 'RANDOM_RESULT_OPTIONS'

const store = {
  state: {},
  mutations: {},
  actions: {
    getSavedInputBadges: () => {
      const data = localStorage.getItem(RANDOM_RESULT_OPTIONS)
      if(!data) return null
      return JSON.parse(data)
    },
    saveInputBadges: (optionButtons: OptionButtons) => {
      localStorage.setItem(RANDOM_RESULT_OPTIONS, JSON.stringify(optionButtons))
    },
    deleteSavedInputBadges: () => {
      localStorage.removeItem(RANDOM_RESULT_OPTIONS)
    },
  }
}

export default store