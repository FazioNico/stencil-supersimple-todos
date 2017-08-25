/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   24-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 24-08-2017
 */

import { Component, Prop, State, Listen } from '@stencil/core';

interface Todo {
    _id:string;
    desc:string;
    complete:boolean;
}

interface InputKeyEvent extends KeyboardEvent {
  target: EventTarget & { value: string }
}


@Component({
  tag: 'todos-list',
  styleUrl: 'todos-list.scss'
})
export class TodosList {

  @Prop() first:string
  @Prop() last:string
  @State() todos:Todo[]

  @Listen('todoCompleted') todoCompletedHandler(event: CustomEvent) {
    this.handleClick(event.detail);
  }

  constructor(){
    this.todos = [
      {_id:'001',desc:'fst todo',complete:false},
      {_id:'002', desc:'scd todo',complete:true}
    ]
  }

  handleClick(todoChanged:Todo):void {
    // create new const with each element of this.todos Array (use ES6 is same as .concat())
    const updatedTodos = [...this.todos]
    // update todo by id
    updatedTodos.map((todo:Todo) => {
        (todo._id === todoChanged._id) ? todo.complete = !todo.complete : null
        return todo
    })
    // update this.todos to re-render and update view...
    console.log('Bug: todos list is updated before reassign-> ', this.todos)
    this.todos = updatedTodos
  }

  handleKeyPress(event:InputKeyEvent):void {
    if(event.keyCode !== 13){
      return
    }
    this.todos = [...this.todos, {_id: `${Date.now()}`,desc:event.target.value, complete:false}]
    event.target.value = ''
    console.log(this.todos)
  }

  render():JSX.Element {

    const TODO_LIST:JSX.Element = this.todos.map((item:Todo)=>{
      return (
        <todo-item todo={item}/>
        //(todo.complete)? <li onClick={ _ => this.handleClick(todo)} class="complete">{todo.desc}</li> : <li onClick={ _ => this.handleClick(todo)}>{todo.desc}</li>
      )
    });

    return (
      <div>
        <p>
          Hello, my name is {this.first} {this.last}. <br/>
          Play with the todos list:
        </p>
      <div>

      <div>
        <input
          onKeyPress={ (event: InputKeyEvent) => this.handleKeyPress(event)}
          placeholder="add new todo..."/>
      </div>

      </div>
        <ul>
          {TODO_LIST}
        </ul>
      </div>

    );
  }
}
