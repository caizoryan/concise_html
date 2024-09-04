import { h as html } from "./index.js";
import { h as f } from "./solid_monke/solid_monke.js";
import { render, sig, mem } from "./solid_monke/solid_monke.js";
import * as sass from 'sass'

let count = sig(4);
let click = () => count.set(count() + 1);
let numbers = mem(() => Array.from({ length: count() }, (_, i) => i + 1));

let counter = () => html`
   .bg-pink
        p -- counter ${count}
        button [ onclick=${click} ] -- Increment ${count}`


let listItem = (e) => html`li [style=color:red;] -- ${e}`
let even = (e) => e % 2 === 0;
let evenListItem = (number) => html`when ${() => even(number)} then ${() => listItem(number)}`

let css = (strings, ...expressions) => {
  let at_i = (i) => typeof expressions[i] === "function" ? expressions[i]() : expressions[i];
  let str = strings.reduce((acc, str, i) => acc + str + (at_i(i) || ""), "");

  return sass.compileString(str, { syntax: "indented" }).css;
}

let vars = `$bg: violet`

let style = css`
  ${vars}

  * 
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, .1) 
    padding: 10px
    margin: 10px

  .container 
    background-color: $bg
    padding: 10px

  .grid-like 
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))

  li::marker
    content: "👉"
  `;


let item = (number) => html`
  .something [style=color:yellow;]
    p -- ${number}
`

let list = () => html`
    .container
      h1 -- Even numbers
      div.grid-like
        #each
          of -- ${numbers}
          as -- ${evenListItem}

    .container
      h1 -- All numbers
      .grid-like
        each ${numbers} as ${item}`

let exceeded = mem(() => count() > 5);
let showWon = () => html`p -- count is greater than 5`
let won = () => html`when ${exceeded} then ${showWon}`


let div = [counter, list, won];

render(f("div", div), document.body);
document.head.innerHTML += `<style>${style}</style>`;
