import React, { useState, useEffect } from 'react'
import { Card, SplitButton, Dropdown } from 'react-bootstrap'

const ToDoList = props => {
    const [toDo, setToDo] = useState(props.toDoList)

    useEffect(() => {
        if (props.search === '') setToDo(props.toDoList)
        else {
            let filteredArr = toDo.filter(obj => obj.task.includes(props.search))
            setToDo(filteredArr)
        }
    }, [props.search])

    useEffect(() => {
        setToDo(props.toDoList)
    }, [props.toDoList])

    const checkBoxHandler = event => {
        const { id } = event.target
        const list = [...toDo]

        let completedItem = list.find(obj => obj.id == id)
        let index = list.findIndex(obj => obj.id == id)
        list.splice(index, 1)

        props.updateToDo({ updatedToDo: list, item: completedItem, action: 'update' })
    }

    const deleteHandler = event => {
        const { id } = event.target
        const list = [...toDo]

        let index = list.findIndex(obj => obj.id == id)
        list.splice(index, 1)

        props.updateToDo({ updatedToDo: list, item: {}, action: 'delete' })
    }

    const plotRows = () => {
        return toDo.map(obj => {
            let timeStamp = new Date(obj.dueDate)
            let day = timeStamp.toLocaleDateString('en', { weekday: 'long' })
            let month = timeStamp.toLocaleDateString('en', { month: 'long' })
            let time = timeStamp.toLocaleTimeString('en', { timeStyle: 'short' })

            let timeString = `${day}, ${month} ${timeStamp.getDate()} at ${time}`

            return (
                <tr key={obj.id}>
                    <td>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input id={obj.id} type="checkbox" class="form-check-input" value="" onChange={checkBoxHandler} />
                            </label>
                        </div>
                    </td>
                    <td style={{ width: '90%' }}>
                        <p className="todo-title">{obj.task}</p>
                        <p className="todo-description">{obj.description}</p>
                        <p className="todo-description pt-3" >
                            <i class="fas fa-circle fa-xs"></i>&nbsp;&nbsp;{timeString}
                        </p>
                    </td>
                    <td>
                        <SplitButton
                            size="sm"
                            variant="outline-secondary"
                            id="dropdown-basic"
                            title="Edit"
                        >
                            <Dropdown.Item id={obj.id} onClick={deleteHandler}>Delete</Dropdown.Item>
                            <Dropdown.Item>Duplicate</Dropdown.Item>
                            <Dropdown.Item>Add Reminder</Dropdown.Item>
                            <Dropdown.Item>Add Comment</Dropdown.Item>
                        </SplitButton>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Card>
            <Card.Header as="h5">To Do</Card.Header>
            <Card.Body><table id="toDo-table">{plotRows()}</table></Card.Body>
        </Card>
    )
}

export default ToDoList