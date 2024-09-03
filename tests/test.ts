import { expect, test } from "bun:test";

test('basic', () => {
	let world = 'world'
	expect(
		//@ts-ignore 
		h`div`).toEqual
		([{ tag: 'div', children: [], attrs: {} }])
})


test.run()
