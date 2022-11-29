import './Table.scss';
import { React, useState } from 'react';
import axios from 'axios';
import $ from 'jquery';

function TableUser() {

  const URL_API = require('../services/enviroment').URL_API;
  const token = window.sessionStorage.getItem("tkn");
  var param = '';
  var busqueda = '';

  const [data, setData] = useState([]);

  const [disabledID, setDisabledID] = useState(false);
  const [disabledName, setDisabledName] = useState(false);
  const [disabledEmpresa, setDisabledEmpresa] = useState(false);

  const [registro, setRegistro] = useState('');
  const onChangeRegistro = (event) => {
    setRegistro(event.target.value);
    if (event.target.value.length > 0) {
      setDisabledID(true)
      setDisabledEmpresa(true);
    }
    else {
      setDisabledID(false)
      setDisabledEmpresa(false);
    }
  }

  const [id, setId] = useState('');
  const onChangeId = (event) => {
    setId(event.target.value);
    if (event.target.value.length > 0) {
      setDisabledName(true);
      setDisabledEmpresa(true);
    }
    else {
      setDisabledName(false)
      setDisabledEmpresa(false);
    }
  }

  const [empresa, setEmpresa] = useState('');
  const onChangeEmpresa = (event) => {
    setEmpresa(event.target.value);
    if (event.target.value.length > 0) {
      setDisabledName(true);
      setDisabledID(true);
    }
    else {
      setDisabledName(false)
      setDisabledID(false);
    }
  }

  const onSubmit = (event) => {
    if (registro) {
      console.log(registro);
      param = "fullName";
      busqueda = registro;
    } else if (id) {
      console.log(id);
      param = "id";
      busqueda = id;
    } else if (empresa) {
      console.log(empresa);
      param = "businessName";
      busqueda = empresa;
    } else {
      console.log(registro);
    }
    if (window.sessionStorage.getItem("tkn")) {
      let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      axios.get(URL_API + "clients?" + param + "=" + busqueda,
        { headers: headers }
      )
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
          alert("Realizando búsqueda: " + registro)

        })
        .catch((err) => {
          console.log("Error: " + err.response.request.status);
          if (err.response.request.status === 401) {
            alert("Actualizar Token")
            sessionStorage.removeItem('tkn');
            window.location.reload(false);
          }
        });
    } else {
      alert("Debe generar Token")
    }
    event.preventDefault();
  }

  function eliminarCliente(id){
    console.log(id);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    axios.delete(URL_API + "clients/" + id,
      { headers: headers }
    )
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
        alert("Eliminando el registro: " + id)

      })
      .catch((err) => {
        console.log("Error: " + err.response.request.status);
        if (err.response.request.status === 401) {
          alert("Ha ocurrido un error: "+err.response.request.status)
        }
      });
  }
  

  return (
    <div>
      <table id="customers">

        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Empresa</th>
            <th>Id Empleado</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Eliminar Registro</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.surNames}</td>
                <td>{item.businessName}</td>
                <td>{item.businessId}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td><button id='delete-button'
                onClick={() => eliminarCliente(item.id)}
                >Eliminar
                </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form className='form-table' onSubmit={onSubmit}>
        <label>
          Nombre del cliente a buscar:
          <input id='input-search-name' type="text" name="name"
            value={registro}
            onChange={onChangeRegistro}
            disabled={disabledName}
          />
        </label>
        <br />
        <label>
          Id del cliente a buscar:
          <input id='input-search-id' type="text" name="id"
            value={id}
            onChange={onChangeId}
            disabled={disabledID}
          />
        </label>
        <br />
        <label>
          Empresa a buscar:
          <input id='input-search-empresa' type="text" name="empresa"
            value={empresa}
            onChange={onChangeEmpresa}
            disabled={disabledEmpresa}
          />
        </label>
        <br />
        <input type="submit" value="Buscar Registro" />
      </form>
    </div>
  );
}

export { TableUser };