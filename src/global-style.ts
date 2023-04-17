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
  font-family: 'Pretendard Variable';
  font-size: 16px;
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
h1, h2, h3, h4 {
  margin-bottom: 5px;
}
h1 {
  font-size: 1.2em;
  text-align: center;
}
h2 {
  font-size: 1.1em;
}
h3 {
  font-size: 1em;
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