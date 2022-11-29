import React from "react";
import './App.scss';
import { Header } from '../header/Header'
import { ModalForm } from "../modal/Modal"
import { TableUser } from "../table/Table"
import { Token } from "../tokenModal/Token"

function App() {

  return (
    <React.Fragment>
      <Header />
      <TableUser />
      <ModalForm />
      <Token />
    </React.Fragment>
  );
}

export default App;
