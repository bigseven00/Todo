import './App.css'
import TodoTitle from './components/TodoTitle'
import Popup from './components/Popup'
import Todo from './components/Todo'

function App() {
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
