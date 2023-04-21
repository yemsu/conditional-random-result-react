import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import store from "../utils/store"

type UseLocalStorage<State> = [
  saveLocalStorage: (data: State) => void,
  deleteLocalStorage: () => void
]

function useLocalStorage<State>(
  LOCAL_STORAGE_NAME: string,
  setState: Dispatch<SetStateAction<State>>
): UseLocalStorage<State> {  
  useEffect(() => {
    const savedLocalData = store.actions.get(LOCAL_STORAGE_NAME)
    if(savedLocalData) {
      setState(savedLocalData)
    }
  }, [])

  const saveLocalStorage = useCallback((data: State) => {
    store.actions.save(LOCAL_STORAGE_NAME, data)
  }, [])

  const deleteLocalStorage = useCallback(() => {
    store.actions.delete(LOCAL_STORAGE_NAME)
  }, [])

  return [saveLocalStorage, deleteLocalStorage]
}

export default useLocalStorage