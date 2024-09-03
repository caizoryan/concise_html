import { h as html } from "./index.js";
import { h as f } from "../solid_monke/solid_monke.js";
import { render, sig, mem } from "../solid_monke/solid_monke.js";

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

let list = () => html`
    .container
      h1 -- Even numbers
      ul.bg-blue
        #each
          of -- ${numbers}
          as -- ${evenListItem}

    .container
      h1 -- All numbers
      ul.bg-blue
        each ${numbers} as ${number => html`li -- ${number}`}`

let moreThan5 = mem(() => count() > 5);
let showWon = () => html`p -- count is greater than 5`

let won = () => html`when ${moreThan5} then ${showWon}`

let div = [counter, list, won];
render(f("div", div), document.body);
