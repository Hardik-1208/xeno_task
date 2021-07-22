import React from 'react'
import { Card } from 'react-bootstrap'

const CompletedToDo = props => {
    const { completedToDo } = props

    const plotRows = () => {
        return completedToDo.map(obj => {
            let date = new Date(obj.completionDate)
            let timeString = `Task Completed on ${date.getDate()} ${date.toLocaleDateString('en', { month: 'long' })}`

            return (
                <tr>
                    <td>
                        <div class="form-check">
                            <label class="form-check-label">
                                <input type="checkbox" checked class="form-check-input" value="" />
                            </label>
                        </div>
                    </td>
                    <td>
                        <p className="m-0">
                            <span className="complete-task">{obj.task}</span>
                            <span className="time-string">
                                <i class="fas fa-circle fa-xs"></i>&nbsp;&nbsp;{timeString}
                            </span>
                        </p>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Card>
            <Card.Header as="h5">Completed</Card.Header>
            <Card.Body><table id="complete-table">{plotRows()}</table></Card.Body>
        </Card>
    )
}

export default CompletedToDo