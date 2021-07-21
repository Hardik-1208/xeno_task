import React from 'react'
import { Card } from 'react-bootstrap'

const CompletedToDo = props => {
    const { completedToDo } = props

    const plotRows = () => {
        return completedToDo.map(obj => (
            <tr>
                <td>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" checked class="form-check-input" value="" />
                        </label>
                    </div>
                </td>
                <td>
                    <p className="m-0 table-content">{obj.task}</p>
                </td>
            </tr>
        ))
    }

    return (
        <Card>
            <Card.Header as="h5">Completed</Card.Header>
            <Card.Body><table id="complete-table">{plotRows()}</table></Card.Body>
        </Card>
    )
}

export default CompletedToDo