import type {FilterValues, Task} from './App'
import {Button} from './Button'


type Props = {
  title: string
  tasks: Task[]
  deleteTask: (id: number) => void
  changeFilter: (filter: FilterValues) => void
 
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: Props) => {

 

  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title={'+'} />
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
