/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   24-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 24-08-2017
 */

import { Component, Prop, State, Listen } from '@stencil/core';

interface ITodo {
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
  @State() todos:ITodo[]

  @Listen('todoCompleted') todoCompletedHandler(event: CustomEvent) {
    this.handleClick(event.detail);
  }

  constructor(){
    this.todos = [
      {_id:'001',desc:'fst todo',complete:false},
      {_id:'002', desc:'scd todo',complete:true}
    ]
  }

  handleClick(todoChanged:ITodo):void {
    // update todo ...
    todoChanged.complete = !todoChanged.complete;
    // assign new todo[] to this.todos
    this.todos = [
      // extract all unchanged todos
      ...this.todos.filter(t=>t._id !== todoChanged._id),
      // add changed todo
      todoChanged
    ]
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
          {
            this.todos.map((item:ITodo)=>{
                return <todo-item todo={item}/>
            })
          }
        </ul>
      </div>

    );
  }
}
