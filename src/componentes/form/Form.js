import { React, useState } from 'react';
import './Form.scss';
import axios from 'axios';

function Form() {

    const URL_API = require('../services/enviroment').URL_API
    const token = window.sessionStorage.getItem("tkn");
    var bodyRequest;

    const onAdd = (event) => {
        console.log(fullName, surNames, businessName, businessId, email, address, phone);
        bodyRequest = {
            "fullName": fullName,
            "surNames": surNames,
            "businessName": businessName,
            "businessId": businessId,
            "email": email,
            "address": address,
            "phone": phone
        };
        console.log("json: " + bodyRequest.phone);
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        axios.post(URL_API + 'clients', bodyRequest, {
            headers: headers
        })
            .then((response) => {
                console.log(response);
                alert("Creación Exitosa")
            })
            .catch((error) => {
                console.log(error);
                if (error.response.request.status === 401) {
                    alert("Actualizar Token")
                    sessionStorage.removeItem('tkn');
                }
            })
    }

    const [fullName, setFullName] = useState('');
    const [surNames, setSurNames] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessId, setBusinessId] = useState('');
    const [email, setEmail] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setPhone] = useState('');

    const onChangeName = (event) => {
        setFullName(event.target.value);
    }

    const onChangeLastname = (event) => {
        setSurNames(event.target.value);
    }

    const onChangeBusinessName = (event) => {
        setBusinessName(event.target.value);
    }

    const onChangeBusinessId = event => {
        const result = event.target.value.replace(/\D/g, '');
        setBusinessId(result);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangeAdress = (event) => {
        setaddress(event.target.value);
    }

    const onChangePhone = event => {
        const result = event.target.value.replace(/\D/g, '');
        setPhone(result);
    };

    return (
        <div>
            <p className="texto">Registro</p>
            <div className="Registro">
                <form onSubmit={onAdd}>
                    <span className="fontawesome-user"></span>
                    <input type="text"
                        value={fullName}
                        onChange={onChangeName}
                        required placeholder="Nombre" />
                    <span className="fontawesome-user"></span>
                    <input type="text"
                        value={surNames}
                        onChange={onChangeLastname}
                        required placeholder="Apellidos" />
                    <span className="fontawesome-building"></span>
                    <input type="text"
                        value={businessName}
                        onChange={onChangeBusinessName}
                        required placeholder="Empresa" />
                    <span className="fontawesome-user"></span>
                    <input type="text" minLength="4" maxLength="10"
                        value={businessId}
                        onChange={onChangeBusinessId} required placeholder="Id Empleado" />
                    <span className="fontawesome-envelope-alt"></span>
                    <input type="email" id='email'
                        value={email}
                        onChange={onChangeEmail}
                        required placeholder="Correo" />
                    <span className="fontawesome-building"></span>
                    <input type="text"
                        value={address}
                        onChange={onChangeAdress}
                        required placeholder="Dirección" />
                    <span className="fontawesome-phone"></span>
                    <input type="text" minLength="10" maxLength="10"
                        value={phone}
                        onChange={onChangePhone} required placeholder="Teléfono" />
                    <input type="submit" value="Registrar" title="Registra tu cuenta" />
                </form>
            </div>
        </div>
    );
}

export { Form }