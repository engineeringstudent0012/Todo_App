import './App.css'
import {useEffect, useState} from "react"
import {Button, FormControl, Input} from '@material-ui/core'
import {InputLabel} from '@material-ui/core'
import Todo from "./Todo"
import db from "./firebase"
import firebase from "firebase"


function App() {
    const [todos, setTodos] = useState([''])
    const [input, setInput] = useState("")

    // when the app loads we need to listen to the database and fetch new todos as they get add /remove
    useEffect(() => {
        //this code fires when the app.js loads
        db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
        })
    }, [])

    const addTodo = (event) => {
        //This will fire when we click the button
        event.preventDefault() //will stop REFRESH

        db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setTodos([...todos, input])
        setInput("") //Clear up the input field after clicking the add Todo button
    }

    return (
        <div className="App">
            <h1>Todo App </h1>
            <h4>Organize Your life</h4>

            <form action="">

                <FormControl>
                    <InputLabel> Write A Todo</InputLabel>
                    <Input type="text" value={input} onChange={event => setInput(event.target.value)}/>
                </FormControl>

                <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
                    Add Todo
                </Button>
            </form>
            <ul>


                {todos.map(todo =>
                    <Todo todo={todo}/>
                )
                }
            </ul>

        </div>
    )
}

export default App
