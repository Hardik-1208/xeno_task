import React, { Fragment, useState } from 'react'
import { Row, Col, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap'

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
        onModalHide()
    }

    const fieldHandler = event => {
        const { id, value } = event.target
        let toDo = { ...newToDo }

        toDo[id] = value
        setNewToDo(toDo)
    }

    const dateHandler = event => {
        const { value } = event.target
        let toDo = { ...newToDo }

        if (value === '') return

        let date = new Date(value)
        toDo['date'] = value
        toDo['dueDate'] = date

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

    const onModalHide = () => {
        setNewToDo({ task: '', description: '', dueDate: '', date: '' })
        setShowModal(false)
    }

    return (
        <Fragment>
            <Row>
                <Col md='1' />
                <Col md='10'>
                    <Row className="pb-4">
                        <Col md='10'><h4>To Do List</h4></Col>
                        <Col md='2'>
                            <Button variant="primary" size='sm' onClick={() => setShowModal(true)} style={{ float: 'right' }}>
                                Add To Do
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col md='6' className="mb-2">
                            <InputGroup size="sm" onChange={searchHandler}>
                                <FormControl
                                    placeholder="Search To Do"
                                    value={search}
                                    aria-label="Small"
                                    aria-describedby="search"
                                    style={{ borderRadius: '20px 0 0 20px' }}
                                />
                                <InputGroup.Text id="search" style={{ borderRadius: '0 20px 20px 0' }}>
                                    <i class="fas fa-search" />
                                </InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className="pb-4 pt-2" style={{ borderBottom: '1px solid #CCC' }}>
                        <Col md='12'>
                            <ToDoList
                                toDoList={toDoList}
                                search={search}
                                updateToDo={updateHandler}
                            />
                        </Col>
                    </Row>

                    <Row className="py-4">
                        <Col><CompletedToDo completedToDo={completedList} /></Col>
                    </Row>
                </Col>
            </Row>


            <Modal
                size='lg'
                show={showModal}
                onHide={onModalHide}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="task">
                            <Form.Label>Task <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" placeholder="Task" value={newToDo.task} onChange={fieldHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dueDate" onChange={dateHandler}>
                            <Form.Label>Due Date <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="date" value={newToDo.date} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={newToDo.description} onChange={fieldHandler} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onModalHide}>Close</Button>
                    <Button disabled={!(newToDo.task && newToDo.date)} variant="primary" onClick={addToDoHandler}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ViewUI
