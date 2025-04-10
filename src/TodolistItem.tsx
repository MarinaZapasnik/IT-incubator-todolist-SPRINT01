import { useRef } from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'


type Props = {
  title: string
  tasks: Task[]
  deleteTask: (id: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (title: string) => void
 
}

export const TodolistItem = ({
              title, 
              tasks, 
              deleteTask, 
              changeFilter, 
              createTask
            }: Props) => {

  const taskInputRef = useRef<HTMLInputElement>(null)

  //useRef<HTMLInputElement> указывает, что эта ссылка будет относиться к элементу типа HTMLInputElement
  //Начальное значение — null. 
  //Это важно, потому что на момент первой отрисовки компонента элемент может ещё не существовать

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input ref={taskInputRef}/>
          <Button title={'+'} onClick={() => {
            
            if (taskInputRef.current) {
              createTask(taskInputRef.current.value)
              taskInputRef.current.value = ''
            }
          }}
          />


        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                return (
                    <li key={task.id}>
                      <input type="checkbox" checked={task.isDone} />
                      <span>{task.title}</span>
                      <Button onClick={() => deleteTask(task.id)} title='X'/> 
                    </li>
                )
              })}
            </ul>
        )}
        <div>
          <Button onClick={() => changeFilter('all')} title={'All'} />
          <Button onClick={() => changeFilter('active')} title={'Active'} />
          <Button onClick={() => changeFilter('completed')} title={'Completed'} />
        </div>
      </div>
  )
}
