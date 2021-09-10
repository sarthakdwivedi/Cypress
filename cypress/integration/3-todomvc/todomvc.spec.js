/// <reference types="cypress" />
import {TodoPage} from '../../page-objects/todo-page.js'
describe('test the todo actions',()=> {
    const todoPage= new TodoPage()

    beforeEach(() => {
        todoPage.navigate()
        todoPage.validateHeader('todos')
        todoPage.validateNumberOfTodosShown(0)
        
        //cy.get('ul').should('not.have.descendants','li')
    })

    it('is able to add a task', () => {
        let newText = 'My task'
        todoPage.addTodo(newText)
        todoPage.validateNumberOfTodosShown(1)
        todoPage.validateTodoText(0, newText)
        todoPage.validateTodoCompletedState(0,false)
        todoPage.validateTaskState(0, false)
        todoPage.validateTextooter(1)
    })


    describe('test the update task functionality', () => {

        beforeEach(() => {
            let newText = 'My task'
            todoPage.addTodo(newText)
        })

        it('is able to update a task', () => {
            let updateText='I have updated the task label'
            todoPage.updateTodoText(0,updateText)
            todoPage.validateTodoText(0, updateText)
        })

        it('is able to complete a task', () => {

            todoPage.completeTodo(0)
            todoPage.validateTodoCompletedState(0, true)
            todoPage.validateTaskState(0, true)
        })

    })

    describe('test the Filter functionality', () => {

        beforeEach(() => {
            todoPage.addTodo('My task {Enter}')
            todoPage.addTodo('My Second task {Enter}')
            todoPage.addTodo('My Third task {Enter}')
            todoPage.completeTodo(1)
        })

        it('is able to filter only active task', () => {

            todoPage.showOnlyActiveTodos()
            todoPage.validateNumberOfTodosShown(2)
        })

        it('is able to filter only completed task', () => {

            todoPage.showOnlyCompletedTodos()
            todoPage.validateNumberOfTodosShown(1)
        })

        it('is able to filter only All task', () => {

            todoPage.showAllTodos()
            todoPage.validateNumberOfTodosShown(3)
        })

        it('is able to clear completed task', () => {
            todoPage.clearCompleted()
            todoPage.validateNumberOfTodosShown(2)
        })
    })

})