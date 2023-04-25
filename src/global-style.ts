import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  vertical-align: top;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  line-height: 1.6;
  font-family: var(--font-family);
  font-size: var(--font-size-M);
  color: #333;
}
a, button, input {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}
li {
  list-style: none;
}
h1 {
  font-size: var(--font-size-X-L);
}
h2 {
  font-size: var(--font-size-L);
}
h3 {
  font-size: var(--font-size-M-L);
}
/* input */
input {
  appearance: none;
  border: none;
}
/* button */
button {
  appearance: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
`;