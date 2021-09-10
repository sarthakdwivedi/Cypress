/// <reference types="cypress" />
//import * as todoPage from '../../page-objects/todo-page'
import {TodoPage} from '../../page-objects/todo-page.js'
describe('visual validation', () => {
	const todoPage = new TodoPage()
	before(() => todoPage.navigate())
	beforeEach(() => cy.eyesOpen({
		appName: 'TAU TodoMVC',
		batchName: 'TAU TodoMVC',
		browser: [
			{ name: 'chrome', width: 1024, height: 768 },
			{ name: 'chrome', width: 800, height: 600 },
			{ name: 'firefox', width: 1024, height: 768 },
			{ deviceName: 'iPhone X' },
		]}))

	it('should look good', () => {
		cy.eyesCheckWindow('empty todo list')
		todoPage.addTodo('Clean room')
		todoPage.addTodo('Learn javascript')
		cy.eyesCheckWindow('two todos')
		todoPage.completeTodo(0)
		cy.eyesCheckWindow('mark as completed')
	})
	afterEach(() => { cy.eyesClose() })
})