import { useState } from "react";
import navLogo from '../../Assets/Images/logo-atlante.png'

import {Form, Button} from "react-bootstrap";
import "./styles.css";

export default function Login(){
   const [loginData, setLoginData] = useState();
   const handleChange = (e) => {
      setLoginData({ ...loginData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(loginData);     
   }

   return(
      <div className="form-login">
         <nav className="form-nav">
            <a href="/home">
               <img 
                  src={navLogo}
               />
            </a>
         </nav>
         <div className="barra"></div>
         <div className="form-body">
            <Form onSubmit={handleSubmit}>
               <Form.Group controlId="email">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control 
                     type="email" 
                     placeholder="Digite seu email" 
                     onChange={handleChange}
                  />
               </Form.Group>

               <Form.Group controlId="password">
                  <Form.Label>Senha: </Form.Label>
                  <Form.Control 
                     type="password" 
                     placeholder="Password" 
                     onChange={handleChange}
                  />
               </Form.Group>
               <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Mantenha-me logado" />
               </Form.Group>
               <Button variant="primary" type="submit">
                  Entrar
               </Button>
            </Form>
         </div>
      </div>
   );
}