import { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import store from "../utils/store"

function useLocalStorage<State>(
  LOCAL_STORAGE_NAME: string,
  setState: Dispatch<SetStateAction<State>>
) {  
  useEffect(() => {
    const savedLocalData = store.actions.get(LOCAL_STORAGE_NAME)
    if(savedLocalData) {
      setState(savedLocalData)
    }
  }, [])

  const saveLocalStorage = useCallback(<Data>(data: Data) => {
    store.actions.save(LOCAL_STORAGE_NAME, data)
  }, [])

  return [saveLocalStorage]
}

export default useLocalStorage