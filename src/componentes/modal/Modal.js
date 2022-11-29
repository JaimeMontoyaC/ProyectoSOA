import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "../form/Form"
import $ from 'jquery';
import './Modal.scss';

function ModalForm() {

    const [show, setShow] = useState(false);


    const handleClose = () => {
        let background = document.getElementById('customers')
        background.className = 'customers'

        $('.modal-token').css('display', 'block');
        $('.form-table').css('display', 'inline-grid');

        setShow(false)
    }

    const handleShow = () => {
        let background = document.getElementById('customers')
        background.className = 'customers-off'


        $('.modal-token').css('display', 'none');
        $('.form-table').css('display', 'none');

        setShow(true)

        if (window.sessionStorage.getItem("tkn")) {
            this.token = window.sessionStorage.getItem("tkn");
        } else {
            alert("Debe generar Token")
            handleClose();
        }
    }

    return (
        <div className='modal-form'>
            <Button className='button-add' variant="primary" onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButtonForm>
                </Modal.Header>
                <Form />
                <Modal.Footer>
                    <Button className='button-out' variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export { ModalForm }