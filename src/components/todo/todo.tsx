/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   24-08-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 24-08-2017
 */

import { Component, Prop, PropWillChange, Event, EventEmitter } from '@stencil/core';

interface ITodo {
    _id:string;
    desc:string;
    complete:boolean;
}


@Component({
  tag: 'todo-item',
  styleUrl: 'todo.scss'
})
export class Todo {

  @Prop() todo:ITodo;
  // @PropWillChange('todo')
  // willChangeHandler(newValue: ITodo) {
  //   console.log('The new value of todo is: ', newValue);
  //   //this.todo = newValue
  // }

  @Event() todoCompleted: EventEmitter;
  handleClick():void {
    this.todoCompleted.emit(this.todo);
  }

  render():JSX.Element {
    console.log('todo-item', this.todo)
    return (
      (this.todo.complete)? <li onClick={ _ => this.handleClick()} class="complete">{this.todo.desc}</li> : <li onClick={ _ => this.handleClick()}>{this.todo.desc}</li>
    )
  }

}
