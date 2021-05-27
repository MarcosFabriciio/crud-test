import { Pagination } from "react-bootstrap"

export default function Pag(data) {
   let currentPage = data.page.current;
   let totalPages = data.page.total;

   return (
      <div>
         <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            { 
               currentPage >= 3 ? (
                  <Pagination.Ellipsis />
               ) : null 
            } 
            {
               currentPage >= 2 ? (
                  <Pagination.Item >{currentPage - 1}</Pagination.Item>                  
               ) : null
            }
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {
               totalPages - currentPage >= 1 ? (
                  <Pagination.Item >{currentPage + 1}</Pagination.Item>                  
               ) : null
            }
            { 
               totalPages - currentPage >= 2 ? (
                  <Pagination.Ellipsis />
               ) : null 
            }
            <Pagination.Next />
            <Pagination.Last />
         </Pagination>
      </div>
   );
}