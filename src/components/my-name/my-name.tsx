/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   24-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 24-08-2017
 */

import { Component, Prop, State } from '@stencil/core';

interface Todo {
    _id:string;
    desc:string;
    complete:boolean;
}

@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {

  @Prop() first:string;
  @Prop() last:string;
  @State() todos:Todo[];

  constructor(){
    this.todos = [
      {_id:'001',desc:'fst todo',complete:false},
      {_id:'002', desc:'scd todo',complete:true}
    ]
  }

  handleClick(todoChanged:Todo):void {
    this.todos = this.todos.map((todo:Todo) => {
       (todo._id === todoChanged._id) ? todo.complete = !todo.complete : null;
       return todo
    })
  }

  handleKeyPress(event:any):void {
    if(event.keyCode !== 13){
      return
    }
    this.todos = [...this.todos, {_id: `${Date.now()}`,desc:event.target.value, complete:false}]
    event.target.value = ''
    console.log(this.todos)
  }

  render():JSX.Element {

    const TODO_LIST:JSX.Element = this.todos.map((todo:Todo)=>{
      return (
        (todo.complete)? <li onClick={ _ => this.handleClick(todo)} class="complete">{todo.desc}</li> : <li onClick={ _ => this.handleClick(todo)}>{todo.desc}</li>
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
          onKeyPress={ (event: UIEvent) => this.handleKeyPress(event)}
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
