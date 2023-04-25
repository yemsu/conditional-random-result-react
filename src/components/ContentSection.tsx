import { ReactNode } from "react"
import styled, { ThemeProvider, css } from "styled-components"
import { StyleMap } from "../types/common"

interface ContentSectionProps {
  title: string,
  children: ReactNode,
  styleTheme?: 'column' | 'row' | 'wrapContent'
  align?: 'left' | 'center'
  bg?: 'none' | 'primary' | 'primary-200'
}

function ContentSection(props: ContentSectionProps) {
  const {
    title,
    children,
    styleTheme = 'column',
    align = 'left',
    bg = 'none',
  } = props

  return (
    <ThemeProvider
      theme={themeStyles[styleTheme]}
    >
      <SectionStyled align={alignStyles[align]} bg={bg}>
        <h2 className="title">{ title }</h2>
        <div className="area-content">
          { children }
        </div>
      </SectionStyled>
    </ThemeProvider>
  )
}

const themeStyles = {
  column: {
    SectionStyled: css`
      .area-content {
        margin-top: 5px;
      }
    `,
  },
  row: {
    SectionStyled: css`
      display: flex;
      gap: 5px;
      .title {
        width: 50px;
        flex-shrink: 0;
      }
      .area-content {
        flex: 1;
      }
    `,
  },
  wrapContent: {
    SectionStyled: css`
      > .area-content {
        margin-top: 5px;
        padding: 10px;
        border: 1px solid var(--gray-900);
        border-radius: var(--br-m);
      }
    `,
  }
} 

const alignStyles: {[key: string]: StyleMap} = {
  left: {
    SectionStyled: css``
  },
  center: {
    SectionStyled: css`
      text-align: center;
      .area-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  }
}

const SectionStyled = styled.section<{align: StyleMap, bg: string}>`
  ${(props) => props.theme.SectionStyled}
  ${(props) => props.align.SectionStyled}
  ${(props) => {
    const bgColor = props.bg.includes('primary') 
      ? css`background-color: var(--${props.bg});`
      : ''
    const bgLayout = props.bg !== 'none'
      ? css`
        padding: 10px 10px 20px;
        border-radius: var(--br-m);
      `
      : ''
    return css`
      ${bgColor}
      ${bgLayout}
    `
  }}
  &:nth-child(n+2) {
    margin-top: 20px;
  }
  & section:nth-child(n+2) {
    margin-top: 10px
  }
  & section h2 {
    font-size: 1em;
  }
`

export default ContentSection