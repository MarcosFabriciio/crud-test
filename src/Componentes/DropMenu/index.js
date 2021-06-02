import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import navLogo from '../../Assets/Images/miniLogo.png'
import "./styles.css"

export default function DropMenu() {
   const [showHome, setShowHome] = useState("collapse");
   const [clientes, setClientes] = useState("collapse");
   const [expandClientes, setExpandClientes] = useState(false);
   const [expandInicial, setExpandInicial] = useState(false)

   function activateDrop(event) {
      switch (event.target.accessKey) {
         case "1":
            if (showHome === "collapse") {
               setShowHome('collapse show');
               setExpandClientes(true);
            } else {
               setShowHome('collapse');
               setExpandClientes(false);
            }
            break;
         case "2":
            if (clientes === "collapse") {
               setClientes('collapse show');
               setExpandInicial(true);
            } else {
               setClientes('collapse');
               setExpandInicial(false);
            }
            break;
         default:
            break;
      }
   }

   function dropItems() {

   }

   return (
      <div class="">
         <Navbar expand="lg">
            <Navbar.Brand href="#home">
               <a href="/" className="btn btn-initial logo">
                  <span className="">
                     <img
                        alt="Home pag"
                        src={navLogo}
                     />
                  </span>
                  <span className="main">atlante</span>
               </a>
            </Navbar.Brand>
            <Navbar.Toggle onClick={() => dropItems()} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="">
                  <ul class="list-unstyled ps-0">
                     <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed d-flex align-items-center" data-bs-toggle="collapse" accessKey="1"
                           data-bs-target="#home-collapse" aria-expanded={expandClientes} onClick={(event) => activateDrop(event)}>
                           Clientes
                     </button>
                        <div className={showHome} id="home-collapse">
                           <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a href="/" className="link-dark rounded">Adicionar</a></li>
                              <li><a href="/clientes" className="link-dark rounded">Listar clientes</a></li>
                           </ul>
                        </div>
                     </li>
                     <li className="mb-1">
                        <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" accessKey="2"
                           data-bs-target="#dashboard-collapse" aria-expanded={expandInicial} onClick={(event) => activateDrop(event)}>
                           Inicial
                     </button>
                        <div className={clientes} id="dashboard-collapse">
                           <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a href="#" className="link-dark rounded">Overview</a></li>
                              <li><a href="#" className="link-dark rounded">Weekly</a></li>
                              <li><a href="#" className="link-dark rounded">Monthly</a></li>
                              <li><a href="#" className="link-dark rounded">Annually</a></li>
                           </ul>
                        </div>
                     </li>
                  </ul>
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </div>
   );
}