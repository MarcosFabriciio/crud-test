import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import "./styles.css"
import { Pagination } from "react-bootstrap"
import CustomMenu from "../../Componentes/CustomMenu";
import CrudContext from "../../Context/context";


export default function Clientes() {
   const [clientes, setClientes] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});
   const {activateCliente} = useContext(CrudContext);

   function buscarNome(event) {
      const value = event.target.value
      setBuscar(value)
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar)
      }
   }

   async function deletarCliente(id) {
      try {
         await axios({
            method: 'delete',
            url: `http://209.97.146.187:4803/clientes/excluir/${id}`,
         })
         window.location.reload()
      } catch (error) {
         alert(error)
      }
   }

   const requestData = async (e, param = '', page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: 'get',
            url: 'http://209.97.146.187:4803/clientes/listar',
            params: {
               nome: param,
               page: page
            }
         })
         setClientes(data.data)
         setPage(data.paginator)
      } catch (error) {
         alert(error)
      }
   }

   useEffect(() => {
      requestData();
   }, [])
   
   console.log(activateCliente);
   return (
      <div className="clientes-container">
         <CustomMenu />

         {activateCliente &&
            (
               <div className="home-container">

                  <div className="input-group">
                     <input
                        className="form-control"
                        type="text"
                        placeholder="Digite o nome"
                        onChange={buscarNome}
                        onKeyDown={(e) => buscarEnter(e)}
                        defaultValue={buscar}
                     />
                     <div className="input-group-append">
                        <button
                           onClick={(e) => requestData(e, buscar)}
                           type="button" className="btn btn-primary"
                        >
                           Buscar
                        </button>
                     </div>
                  </div>
                  <table className="table">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Nome</th>
                           <th scope="col">CPF</th>
                           <th scope="col">Ações</th>
                        </tr>
                     </thead>
                     <tbody>
                        {clientes === null ? "" :
                           clientes.map(cliente => {
                           return (
                              <tr key={cliente.id}>
                                 <td>{cliente.id}</td>
                                 <td>{cliente.nome}</td>
                                 <td>{cliente.cpfCnpj}</td>
                                 <td>
                                    <Link to={`/editar/${cliente.id}`}>Editar</Link>
                                    <button onClick={() => deletarCliente(cliente.id)}>Deletar</button>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
                  <Pagination className="">
                     <Pagination.First onClick={(e) => requestData(e, buscar, 1)} />
                     <Pagination.Prev disabled={page.current === 1 ? true : false} onClick={(e) => requestData(e, buscar, page.current - 1)} />
                     {
                        page.current >= 3 ? (
                           <Pagination.Ellipsis disabled={true} />
                        ) : null
                     }
                     {
                        page.current >= 2 ? (
                           <Pagination.Item onClick={(e) => requestData(e, buscar, page.current - 1)}>
                              {page.current - 1}
                           </Pagination.Item>
                        ) : null
                     }
                     <Pagination.Item active>{page.current}</Pagination.Item>
                     {
                        page.total - page.current >= 1 ? (
                           <Pagination.Item onClick={(e) => requestData(e, buscar, page.current + 1)}>
                              {page.current + 1}
                           </Pagination.Item>
                        ) : null
                     }
                     {
                        page.total - page.current >= 2 ? (
                           <Pagination.Ellipsis disabled={true} />
                        ) : null
                     }
                     <Pagination.Next disabled={page.current === page.total ? true : false} onClick={(e) => requestData(e, buscar, page.current + 1)} />
                     <Pagination.Last onClick={(e) => requestData(e, buscar, page.total)} />
                  </Pagination>
               </div>
            )}
      </div>
   );
}