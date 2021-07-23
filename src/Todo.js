import React, {useState} from 'react'
import {ListItem, List, ListItemText, ListItemAvatar, Button, Modal} from '@material-ui/core'
import './Todo.css'
import db from "./firebase"
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function Todo(props) {
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const [input,setInput] =useState()


    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo:input
        },{merge:true})
        //update the todo with new input text
        setOpen(false)
    }

    return (
        <div>
            <div>
                <Modal open={open} onClose={e => setOpen(false)}>
                    <div className={classes.paper}>
                        <h1>Update Todo Here</h1>
                        <input placeholder={props.todo.todo} value={input} onChange = { event => setInput(event.target.value)}type="text"/>
                        <Button onClick={updateTodo}> Update Todo </Button>
                    </div>
                </Modal>
            </div>
            <div>
                <List className="todo-list">
                    <ListItem>
                        <ListItemAvatar> </ListItemAvatar>
                        <ListItemText primary={props.todo.todo} secondary="Dummy Deadline"/>
                    </ListItem>
                    <button onClick={event => setOpen(true)}>Edit</button>
                    <Button onClick={event =>
                    db.collection('todos').doc(props.todo.id).delete()
                    }>Delete </Button><Button onClick={event =>
                    db.collection('todos').doc(props.todo.id).delete()
                    }>Done</Button>
                </List>
            </div>
        </div>
    )
}


export default Todo

