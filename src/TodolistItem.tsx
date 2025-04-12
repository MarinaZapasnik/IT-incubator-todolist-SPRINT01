import { useState } from 'react'
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
              createTask,
              
            }: Props) => {

  //const taskInputRef = useRef<HTMLInputElement>(null)

  const [taskTitle, setTaskTitle] = useState('')

  const createTaskHandler = () => createTask(taskTitle)

  const isAddTaskDisabled = !taskTitle || taskTitle.length > 20
  

  //useRef<HTMLInputElement> указывает, что эта ссылка будет относиться к элементу типа HTMLInputElement
  //Начальное значение — null. 
  //Это важно, потому что на момент первой отрисовки компонента элемент может ещё не существовать

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input value={taskTitle} placeholder='Введите новую заметку'
            onChange={(e) => setTaskTitle(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isAddTaskDisabled) {
               createTaskHandler()
              }
              
            }}/>
          <Button 
              disabled={isAddTaskDisabled}
              title={'+'} 
              onClick={() => {
                createTaskHandler()
            
          }}
          />

          
          {taskTitle && <div>Max title length is 20 simbols</div>}
          {taskTitle.length > 20 && <div style={{color: 'red'}}>title length is too long</div>}


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
