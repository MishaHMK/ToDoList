import React, { ChangeEvent, FC, useState, useEffect } from 'react';
import { IObjective } from '../interfaces/IObjective';
import { useObjectives } from '../stores/app.store';
import { Form } from 'react-bootstrap';
import { Modal, Button } from 'antd';
import { start } from 'repl';

interface Props {
    isShown: boolean;
}

export const ObjectiveEditModal: React.FC<Props> = ({ isShown }) => {

    const handleClose = () => {
        state.IsShown = false;
        console.log(state.IsShown);
    };

    const [objectiveName, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [state, actions] = useObjectives();

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        const objectiveToUpdate: IObjective =
        {
            id: state.currentId,
            title: event.target.ObjectiveTitle.value,
            taskDescription: event.target.Description.value,
            completed: false,
            boardId: 1
        };

        actions.updateObjective(state.currentId, objectiveToUpdate);
    }

    //prevent-default --!
    return (
        <div className="container">
            <Modal visible={true} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Objective</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="ObjectiveId">
                            <Form.Label>ObjectiveId</Form.Label>
                            <Form.Control type="text" name="ObjectiveId" required
                                placeholder="ObjectiveId"
                                disabled
                                defaultValue={state.currentId}
                            />
                        </Form.Group>

                        <Form.Group controlId="ObjectiveTitle">
                            <Form.Label>ObjectiveTitle</Form.Label>
                            <Form.Control type="text" name="ObjectiveTitle" required
                                defaultValue={state.currentTitle}
                                placeholder="ObjectiveTitle" />
                        </Form.Group>

                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="Description" required
                                defaultValue={state.currentDescription}
                                placeholder="Description" />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Objective
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};