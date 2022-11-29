import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import './Token.scss';
import axios from 'axios';

function Token() {
  const [showToken, setShowToken] = useState(false);
  const URL_API = require('../services/enviroment').URL_API;

  const generarToken = () => {
    axios.get(URL_API+"auth")
    .then(res => {   
      console.log(res.data.data.accessToken);   
      window.sessionStorage.setItem("tkn", res.data.data.accessToken);
      alert("Token Generado");
      handleCloseToken();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleCloseToken = () => {
    let background = document.getElementById('customers')
    background.className = 'customers'

    $('.modal-form').css('display', 'block');
    $('.form-table').css('display', 'inline-grid');

    setShowToken(false)
  }

  const handleShowToken = () => {
    let background = document.getElementById('customers')
    background.className = 'customers-off'
    

    $('.modal-form').css('display', 'none');
    $('.form-table').css('display', 'none');

    setShowToken(true)
  }
 
  return (
    <div className='modal-token'>
      <Button className='token-in' onClick={handleShowToken}>
        Token
      </Button>

      <Modal show={showToken} onHide={handleCloseToken}>
        <Modal.Header closeButtonToken>
        </Modal.Header>
        <Modal.Body>
          <button class="button-token"
            onClick={generarToken}>
            Generar Token
          </button>
        </Modal.Body>
        <Modal.Footer>
          <Button className='token-out' onClick={handleCloseToken}>
            Token
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { Token }