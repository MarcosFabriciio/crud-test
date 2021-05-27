import { Pagination } from "react-bootstrap"

export default function Pag(data) {
   let active = data.page.current;
   let totalPages = data.page.total;

   let items = [];
   for (let number = 1; number <= 5; number++) {
      items.push(
         <Pagination.Item key={number} active={number === active}>
            {number}
         </Pagination.Item>,
      );
   }

   return (
      <div>
         <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Ellipsis />

            <Pagination.Item active>{active}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
         </Pagination>
      </div>
   );
}