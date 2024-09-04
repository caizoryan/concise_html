import { expect, test } from "bun:test";
import { hh as f } from "./index.ts";

test('basic', () => {
	let world = 'world'
	expect(
		//@ts-ignore 
		f`div`).toEqual
		([{ tag: 'div', children: [], attrs: {}, indent: 0 }])
})

test('attrs and indent', () => {
	expect(
		//@ts-ignore 
		f` div [class=container]`).toEqual
		([{ tag: 'div', children: [], attrs: { class: 'container' }, indent: 1 }])
})

test('multiple attrs', () => {
	expect(
		//@ts-ignore 
		f`    div [class=container id=main]`).toEqual
		([{ tag: 'div', children: [], attrs: { class: 'container', id: 'main' }, indent: 4 }])
})


test('Variable attrs', () => {
	let container = () => 'container'
	let main = 'main'
	expect(
		//@ts-ignore 
		f`div [class=${container} id=${main}]`).toEqual
		([{ tag: 'div', children: [], attrs: { class: container, id: main }, indent: 0 }])
})

test('variable key', () => {
	let key = 'class'
	let value = 'container'
	expect(
		//@ts-ignore 
		f`div [${key}=${value}]`).toEqual
		([{ tag: 'div', children: [], attrs: { class: 'container' }, indent: 0 }])
})

test('children', () => {
	expect(
		//@ts-ignore 
		f`div -- hello`).toEqual(
			[{ tag: 'div', children: [{ tag: 'text', value: 'hello', attrs: {}, indent: 0, children: [] }], attrs: {}, indent: 0 }]
		)
})

test('children with variable', () => {
	let name = 'world'
	expect(
		//@ts-ignore 
		f`div -- hello ${name}`).toEqual(
			[{
				tag: 'div',
				children: [
					{
						tag: 'text',
						value: 'hello ',
						attrs: {},
						indent: 0,
						children: []
					},
					{ tag: 'expression', value: name, attrs: {}, indent: 0, children: [] },
					{ tag: 'text', value: '', attrs: {}, indent: 0, children: [] }
				],
				attrs: {}, indent: 0
			}]
		)
})

test('two elements', () => {
	let name = 'world'
	//@ts-ignore 
	let hh = f`
div -- hello
p -- world is cool`


	expect(hh).toEqual(
		[{
			tag: 'div',
			children: [
				{
					tag: 'text',
					value: 'hello',
					attrs: {},
					indent: 0,
					children: []
				},
			],
			attrs: {}, indent: 0
		}
			, {
			tag: 'p',
			children: [
				{
					tag: 'text',
					value: 'world is cool',
					attrs: {},
					indent: 0,
					children: []
				}
			],
			attrs: {}, indent: 0
		}]

	)
})

test('nested elements', () => {
	//@ts-ignore 
	let hh = f`
div
  p -- hello
  p -- world is cool`
	console.log(hh)

	expect(hh).toEqual(
		[{
			tag: 'div',
			children: [{
				tag: 'p',
				children: [
					{
						tag: 'text',
						value: 'hello',
						attrs: {},
						indent: 0,
						children: []
					}
				],
				attrs: {}, indent: 2
			},
			{
				tag: 'p',
				children: [
					{
						tag: 'text',
						value: 'world is cool',
						attrs: {},
						indent: 0,
						children: []
					}
				],
				attrs: {}, indent: 2
			}
			],
			attrs: {}, indent: 0
		}
		]


	)

})

test('triple nested', () => {
	let click = () => 'click'
	//@ts-ignore 
	let hh = f`
div [    
				onclick =    ${click} 
]
	p -- hello
	div     [ class=  container     data-id =  1]

		p -- world`

	console.log(hh)

	expect(hh).toEqual([
		{
			tag: 'div',
			children: [
				{
					tag: 'p',
					children: [
						{
							tag: 'text',
							value: 'hello',
							attrs: {},
							indent: 0,
							children: []
						}
					],
					attrs: {}, indent: 2
				},
				{
					tag: 'div',
					children: [
						{
							tag: 'p',
							children: [
								{
									tag: 'text',
									value: 'world',
									attrs: {},
									indent: 0,
									children: []
								}
							],
							attrs: {}, indent: 4
						}
					],
					attrs: {
						class: 'container', 'data-id': "1"
					}, indent: 2
				}
			],
			attrs: { onclick: click }, indent: 0
		}
	])
})


test('each block', () => {
	let items = ['hello', 'world']
	let fn = (item) => f`p -- ${item}`
	//@ts-ignore 
	let hh = f`each ${items} as ${fn}`

	expect(hh).toEqual([
		{
			tag: 'each', children: [
				{ tag: 'of', value: items, attrs: {}, indent: 2, children: [] },
				{ tag: 'children', value: fn, attrs: {}, indent: 2, children: [] }
			], attrs: {}, indent: 0
		}
	])
})

test('when block', () => {
	let condition = true
	let fn = () => f`p -- hello`
	//@ts-ignore 
	let hh = f`when ${condition} then ${fn}`

	expect(hh).toEqual([
		{
			tag: 'when', children: [
				{ tag: 'condition', value: condition, attrs: {}, indent: 2, children: [] },
				{ tag: 'then', value: fn, attrs: {}, indent: 2, children: [] }
			], attrs: {}, indent: 0
		}
	])
})

test('when and each block', () => {
	let condition = true
	let items = ['hello', 'world']
	let fn = (item) => f`p -- ${item}`
	//@ts-ignore 
	let hh = f`
	div
		each ${items} as ${fn}
		when ${condition} then ${fn}`

	expect(hh).toEqual([
		{
			tag: 'div',
			children: [
				{
					tag: 'each', children: [
						{ tag: 'of', value: items, attrs: {}, indent: 6, children: [] },
						{ tag: 'children', value: fn, attrs: {}, indent: 6, children: [] }
					], attrs: {}, indent: 4
				},
				{
					tag: 'when', children: [
						{ tag: 'condition', value: condition, attrs: {}, indent: 6, children: [] },
						{ tag: 'then', value: fn, attrs: {}, indent: 6, children: [] }
					], attrs: {}, indent: 4
				}
			], attrs: {}, indent: 2
		}
	])

})

test('multiline text', () => {
	let hh = f`
p ---
text that is multiline
hopefully this works
---`
	expect(hh).toEqual([
		{
			tag: 'p',
			children: [
				{
					tag: 'text',
					value: '\ntext that is multiline\nhopefully this works\n',
					attrs: {},
					indent: 0,
					children: []
				}
			],
			attrs: {}, indent: 0
		}
	])

})
