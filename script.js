const initialState = {
  todos: []
}

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      const { todo } = action;
      return {...state, todos: state.todos.concat(todo)};
     break;

    case 'REMOVE_TODO':
      const { todoIndex } = action;
      return {...state, todos: state.todos.filter( (t,i) => i !== todoIndex)};
     break;

    default:
     return state
  }
}

const store = Redux.createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );


$(function() {
  const addTodoBtn = $('#submit-todo-btn');
  const todoInput = $('#task');
  const todoList = $('#todos');

  // register add-todo-btn behaviour
  addTodoBtn.click(addTodo);
  function addTodo(e) {
    // extract input
    e.preventDefault();
    const todoText = todoInput.val();
    todoInput.val('');

    // dispatch action
    store.dispatch({
      type: 'ADD_TODO',
      todo: todoText
    })
  }

  // update list on todos state change
  store.subscribe(updateTodosList);
  function updateTodosList() {
    const state = store.getState();
    const todoListItems = state.todos.map((todo, i) => $('<li></li>')
      .text(todo)
      .data('todoIndex', i)
    );
    todoList
      .empty()
      .append(todoListItems)
  }

  // register delete behaviour
  todoList.on('click', 'li', deleteTodo);
  function deleteTodo(e) {
    const li = $(this);
    const todoIndex = li.data('todoIndex');
    store.dispatch({
      type: 'REMOVE_TODO',
      todoIndex
    })
  }

});
