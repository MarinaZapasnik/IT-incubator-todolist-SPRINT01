import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task} from './App'
import {Button} from './Button'

type Props = {
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValues) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId: string, newStatus: boolean) => void
}

export const TodolistItem = ({
  title, 
  tasks, 
  filter,
  deleteTask, 
  changeFilter, 
  createTask, 
  changeTaskStatus
}: Props) => {

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const createTaskHandler = () => {
    if (taskTitle.trim()) {
      createTask(taskTitle)
      
    } else {
      setError("Введите заголовок! Заголовок не должен быть пустым!")
    }
    
    setTaskTitle('')
  }

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setError(null)
    setTaskTitle(event.currentTarget.value)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }




  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input 
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
                className= { !!error? 'taskInputError' : ''}                 
                 />
          <Button title={'+'} onClick={createTaskHandler}/>
          {error && <div>{error}</div>}
        </div>
        {tasks.length === 0 ? (
            <p>Тасок нет</p>
        ) : (
            <ul>
              {tasks.map(task => {
                const deleteTaskHandler = () => {
                  deleteTask(task.id)
                }

                const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                  const newStatus = event.currentTarget.checked
                  changeTaskStatus(task.id, newStatus)
                }

                return (
                    <li key={task.id}>
                      <input 
                        type="checkbox" 
                        checked={task.isDone}
                        onChange={onChangeTaskStatusHandler}
                        />
                      <span className={task.isDone? 'taskDone' : 'task' }>{task.title}</span>
                      <Button title={'x'} onClick={deleteTaskHandler} />
                    </li>
                )
              })}
            </ul>
        )}
        <div style={{display: 'flex', gap: '5px'}}>
          <Button  
            title={'All'} 
            onClick={() => changeFilter('all')}
            classes={ filter === 'all'? 'filterBtnActive' : 'filterBtn'}
          />
          <Button 
            title={'Active'} 
            onClick={() => changeFilter('active')}
            classes={ filter === 'active'? 'filterBtnActive' : 'filterBtn'}
          />
          <Button 
            title={'Completed'} 
            onClick={() => changeFilter('completed')}
            classes={ filter === 'completed'? 'filterBtnActive' : 'filterBtn'}
          />
        </div>
      </div>
  )
}
