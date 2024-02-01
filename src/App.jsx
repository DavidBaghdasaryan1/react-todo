import { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Todo from './Todo';
import {db} from "./firebase"
import { query, collection, onSnapshot, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import './App.css'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const[todos, setTodos] = useState([])
  const[count, setCount] = useState(0)
  const[input, setInput] = useState("")


  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid Todo");
      return;
    }
    try {
      await addDoc(collection(db, "Todo"), {
        text: input,
        completed: false
      });
      setInput("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  

  useEffect(() => {
    const q = query(collection(db,"Todo"))
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
      let todosArr = []
      querySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArr)
      setCount(todosArr.length);
    })
  })

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "Todo", todo.id), {
      completed: !todo.completed,
    });
  };
  

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "Todo", id));
  };
  

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input 
            onChange={(e) =>{setInput(e.target.value)}}
            className={style.input} type="text" 
            placeholder='Add Todo' 
            value={input}
          />
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={() => toggleComplete(todo)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>

        {count < 1 ? null : <p className={style.count}>You have {count} todos</p>}
        
      </div>
    </div>
  )
}

export default App
