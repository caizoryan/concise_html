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


let listItem = (e) => html`li -- ${e}`


let list = () => html`
    ul.bg-blue

      #each
        of -- ${numbers}
        as -- ${(e) => html`p -- Another way ${e}`}

      each ${numbers} as ${listItem}`

let moreThan5 = mem(() => count() > 5);
let showWon = () => html`p -- count is greater than 5`

let won = () => html`when ${moreThan5} then ${showWon}`

let div = [counter, list, won];
render(f("div", div), document.body);
