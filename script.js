import { h as $ } from "./index.js";
import { h as f } from "../solid_monke/solid_monke.js";
import { render, sig, mem } from "../solid_monke/solid_monke.js";

let count = sig(4);
let click = () => count.set(count() + 1);
let style = { "background-color": "lightblue", padding: "10px" };
let numbers = mem(() => Array.from({ length: count() }, (_, i) => i + 1));
let roundedStyle = "border-radius: 10px; padding: 10px; border: .2px solid black;";
let rounded = (e) => $`p [style=${roundedStyle}] -- ${e}`;
let rounded2 = (e) => $`p [style=${roundedStyle}] -- ass${e}`;

let m = mem(() => true);

let counter = () => $`
   .bg-pink
        p -- counter ${count}
        button [ onclick=${click} ] -- Increment ${count}`


let listItem = (e) => $`li -- ${e}`

let list = () => $`
    ul.bg-blue
      each ${numbers} as ${listItem}`

let moreThan5 = mem(() => count() > 5);
let showWon = () => $`p -- count is greater than 5`

let won = () => $`when ${moreThan5} then ${showWon}`

let div = [counter, list, won];
render(f("div", div), document.body);
