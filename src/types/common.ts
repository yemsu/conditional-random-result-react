import { FlattenSimpleInterpolation } from "styled-components"

export interface Forms {
  [key: string]: string
}

export type OptionButtonsState = {[key: string]: string[]}

export interface StyleMap {
  [key: string]: FlattenSimpleInterpolation
}