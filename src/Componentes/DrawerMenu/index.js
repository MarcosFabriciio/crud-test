import {useContext} from "react";
import navLogo from '../../Assets/Images/miniLogo.png'
import { AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai"
import CrudContext from "../../Context/context";

import './styles.css';

function DrawerMenu() {
   const { activate } = useContext(CrudContext);
   return (
      <div className="borda">
         <ul className="list-unstyled borda-container">
            <li className="logo drawer-item">
               <a href="/" className="btn btn-initial border-bottom drawer-link">
                  <span className="">
                     <img
                        alt="Home pag"
                        src={navLogo}
                     />
                  </span>
                  <span className="drawer-text main">atlante</span>
               </a>
            </li>
            <li className="drawer-item">
               <a href="/home" className="btn btn-initial border-bottom drawer-link">
                  <AiOutlineHome size={25} color="white" />
                  <span className="drawer-text">
                     Página Inicial
                  </span>
               </a>
            </li>
            <li className="drawer-item">
               <a onClick={() => activate()}className="btn btn-initial border-bottom drawer-link">
                  <AiOutlineUsergroupAdd size={25} color="white" />
                  <span className="drawer-text">
                     Adicionar Cliente
                  </span>
               </a>
            </li>
         </ul>
      </div>
   );
}

export default DrawerMenu;