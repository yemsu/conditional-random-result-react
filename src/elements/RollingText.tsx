import { memo, useCallback, useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { getRandomInt } from "../utils"

interface RollingTextProps {
  text: string
  rollingTextList: string[]
  isStartRolling: boolean
  rollingTime: number,
}

function RollingText(props: RollingTextProps) {
  const {
    text,
    rollingTextList,
    isStartRolling,
    rollingTime,
  } = props

  const [isRolling, setIsRolling] = useState(false)
  const [rollingText, setRollingText] = useState(text)

  useEffect(() => {
    isStartRolling && setIsRolling(isStartRolling)
  }, [isStartRolling])

  useEffect(() => {
    isRolling && startRolling()
  }, [isRolling])

  const startRolling = useCallback(() => {
    const rollingSetTime = setInterval(() => {
      const randomIndex = getRandomInt(rollingTextList.length + 1, 0)
      const result = rollingTextList[randomIndex] || '🎉'
      setRollingText(result)
    }, 100)
    setTimeout(() => {
      clearInterval(rollingSetTime)
      setRollingText(text)
      setIsRolling(false)
    }, rollingTime)
  }, [text, rollingText, isStartRolling, rollingTextList, rollingTime])

  return (
    <RollingTextStyled className={isRolling ? 'active' : ''} rollingTime={rollingTime}>
      { rollingText }
    </RollingTextStyled>
  )
}

const resultAnimation = keyframes`
  50% {
    transform: scale(1.2);
  }
`

const RollingTextStyled = styled.span<{rollingTime: number}>`
  /* transition: 0.3s cubic-bezier(0.895, 0.030, 0.685, 0.220); */
  display: inline-block;
  transition: .3s cubic-bezier(0.950, 0.050, 0.795, 0.035);
  &.active {
    transform: scale(.7);
  }
  &:not(.active) {
    animation-name: ${resultAnimation};
    animation-duration: .5s;
    animation-timing-function: cubic-bezier(0.950, 0.050, 0.795, 0.035);    
  }
`

export default memo(RollingText)