export class TodoPage {
    //function to navigate to page
    navigate() {
        cy.visit('http://todomvc-app-for-testing.surge.sh/')
    }

    //function to add a todo
    addTodo(todoText) {
        cy.get('.new-todo').type(todoText + '{enter}')
    }
    //function to validate Header
    validateHeader(headerText) {
        cy.get('h1').should('contain.text', 'todos')
    }
    //function to mark a certain todo as complete
    completeTodo(todoIndex) {
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) .toggle`).click()
    }


    //function to update a todo at a certain index
    updateTodoText(todoIndex, newText) {
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).dblclick()
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) input`).clear().type(newText+'{enter}')
    }

    //function to validate number on footer
    validateTextOnFooter(expectedNumber) {
        cy.get('.footer span').should('have.text', expectedNumber == 0 ? 'No items left' : expectedNumber > 1 ?`{expectedNumber} items left`:'1 item left')
    }

    //function to filter only completed task
    showOnlyCompletedTodos() {
        cy.contains('Completed').click()
    }

    //function to filter only Active task
    showOnlyActiveTodos() {
        cy.contains('Active').click()
    }

    //function to filter All tasks
    showAllTodos() {
        cy.contains('All').click()
    }

    //function to clear completed tasks
    clearCompleted() {
        cy.contains('Clear completed').click()
    }

    //function to verify number of todos
    validateNumberOfTodosShown(expectedNumberOfTodos) {
        cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
    }

    //function to verify completed state
    validateTodoCompletedState(todoIndex, shouldBeCompleted) {
        const l = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`)
        l.should(`${shouldBeCompleted ? '' : 'not.'}have.css`, 'text-decoration-line', 'line-through')
    }

    //function to validate the text in a particular task
    validateTodoText(todoIndex, expectedText) {
        cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
    }

    //function to verify current status
    validateTaskState(todoIndex, isCompleted) {
        const label = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) > .view > .toggle`)
        label.should(`${isCompleted ? '' : 'not.'}be.checked`)
    }
}
