import React, { Component } from 'react'
import { modal, Form, Button } from 'react-bootstrap'
class UpdateModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.showForm} onHide={this.props.handelClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        
                            <Form.Control type="text" placeholder="name" defaultValue={this.props.updateName} />
                            <Form.Control type="text" placeholder="name" defaultValue={this.props.updatUrl} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handelClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateModal
