import { ReactNode } from "react"
import styled from "styled-components"

interface ContentSectionProps {
  title: string,
  children: ReactNode
}

function ContentSection(props: ContentSectionProps) {
  const {
    title,
    children
  } = props

  return (
    <SectionStyled>
      <H2Styled>{ title }</H2Styled>
      <ContentArea>
        { children }
      </ContentArea>
    </SectionStyled>
  )
}

const SectionStyled = styled.section`
  
`

const H2Styled = styled.h2`
  
`

const ContentArea = styled.h2`
  
`

export default ContentSection