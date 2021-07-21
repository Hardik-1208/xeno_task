import React, { useState } from 'react'
import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'

import ToDoList from './ToDoList'
import data from '../assests/JSON/data.json'
import CompletedToDo from './CompletedToDo'

const ViewUI = () => {
    const [toDoList, setToDoList] = useState(() => data.initailToDoList.map(obj => ({ ...obj, id: Math.random() })))
    const [completedList, setCompletedList] = useState(() => data.initialCompleteList.map(obj => ({ ...obj, id: Math.random() })))
    const [showModal, setShowModal] = useState(false)

    const [newToDo, setNewToDo] = useState({ task: '', description: '' })
    const [search, setSearch] = useState('')

    const addToDoHandler = () => {
        let list = [...toDoList]

        list.unshift({ ...newToDo, id: Math.random() })

        setToDoList(list)
        setNewToDo({ task: '', description: '' })
        setShowModal(false)
    }

    const fieldHandler = event => {
        const { id, value } = event.target
        let toDo = { ...newToDo }

        toDo[id] = value
        setNewToDo(toDo)
    }

    const updateHandler = ({ updatedToDo, item, action }) => {
        let list = [...completedList]

        if (action === 'delete') setToDoList(updatedToDo)
        else if (action === 'update') {
            list.unshift({ task: item.task, completionDate: new Date() })

            setToDoList(updatedToDo)
            setCompletedList(list)
        }
    }

    const searchHandler = event => {
        const { value } = event.target
        setSearch(value)
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-1" />
                <div className="col-md-10">

                    <div className="row pb-4">
                        <div className="col-md-10">
                            <h4>To Do List</h4>
                        </div>
                        <div className="col-md-2 text-right">
                            <button className="btn btn-primary float-right btn-sm btn-block" onClick={() => setShowModal(true)}>Add To Do</button>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-5">
                            <InputGroup size="sm" className="mb-3" onChange={searchHandler}>
                                <FormControl value={search} aria-label="Small" aria-describedby="search" />
                                <InputGroup.Text id="search">Small</InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row pb-4 pt-2" style={{ borderBottom: '1px solid #CCC' }}>
                        <div className="col-md-12">
                            <ToDoList
                                toDoList={toDoList}
                                search={search}
                                updateToDo={updateHandler}
                            />
                        </div>
                    </div>

                    <div className="row py-4">
                        <div className="col-md-12"><CompletedToDo completedToDo={completedList} /></div>
                    </div>
                </div>
            </div>

            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="task">
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" placeholder="Task" value={newToDo.task} onChange={fieldHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={newToDo.description} onChange={fieldHandler} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={addToDoHandler}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ViewUI
