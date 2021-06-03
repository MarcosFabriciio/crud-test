
import {useContext, useState} from "react";
import './App.css';
import CustomMenu from './Componentes/CustomMenu'
import FormTest from './Pages/FormTest'
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawerMenu from './Componentes/DrawerMenu';
import CrudContext from "../src/Context/context"

function App() {
   const { activateCliente } = useContext(CrudContext);
   return (
      <div className="app-container">
         <DrawerMenu />
         <div className="form-container">
            {activateCliente && <FormTest />}
         </div>
      </div>
   )
}

export default App;
