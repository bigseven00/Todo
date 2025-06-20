import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/todo'
import TodoTitle from './components/TodoTitle'
import Popup from './components/Popup'

function App() {

  function inputChange(){
    console.log(event.target.value);
  }
 

  return (
    <>
     <TodoTitle/>

     <div>
      <input type="text"/> &nbsp;
      <input type="submit"/>
     </div>

     <Todo task = "Wake Up early and Pray"/>
     <Todo task = "Do some exercise" />
     <Todo task = "Brush and take your bath" />
     <Todo task = "Eat Your Breakfast" />

     {/* <Popup title ="are you very very sure ?"/> */}
    </>
  )
}

export default App
