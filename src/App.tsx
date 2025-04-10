import { useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import { v1 } from 'uuid'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
  
  
  // юз стейт возвращает массив из 2х элементов, это начальное значение и функция
  // юз стейт(тут пишем начальное значение)
  //const [заменяем текущее значение новым, функция которая изменила значение]
  // в <> таких скобках типизируем
  // юз стейт это функция которая принимает инициал значение
  // юз стейт нужен, когда данные меняются
  // в данном случае у нас tasks это изначально то что лежит в переменной
  //дальше tasks меняются и засовываются через setTasks(тут новое значение tasks)



  //установили библиотеку uuid 
  // в ней есть функция v1 используется для генерации UUID версии 1
  //
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  console.log(tasks);
  
  

  // если  фильтер === 'all' то все таски
  // если  фильтер === 'active' то активные таски
  // если  фильтер === 'completed' то выполненные таски

  
  
  const [filter, setFilter] = useState<FilterValues>('all')


  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  let filteredTasks: Task[] = tasks

  // if (filter === 'all') {    
  //   filteredTasks = tasks
  // }
  // условие на all можно не прописывать, потому что тданные не меняются

  if (filter === 'active') {    
    filteredTasks = tasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {    
    filteredTasks = tasks.filter(task => task.isDone)
  }
  
 const deleteTask = (id: string) => {
    const newTasks = tasks.filter( task => task.id !== id) //обязательно создать новую ссылку, новое вместилище, чтобы юз стейт понял, что данные уже другие
    setTasks(newTasks) //передаем в юзстейт отфильтрованные данные
  }

  const createTask = (title: string) => {
    
    const newTask: Task = {id: v1() , title: title, isDone: false}
    const nextState: Task[] = [...tasks, newTask]
    
    setTasks(nextState)


    ///это все можно сократить вот так:
    ///!!!   setTasks([...tasks, {id: v1() , title: title, isDone: false}])   !!!!
  }

  return (
      <div className="app">
        <TodolistItem title="What to learn" 
                      tasks={filteredTasks} 
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}/>
      </div>
  )
}
