import './App.css';
import CustomMenu from './Componentes/CustomMenu'
import FormTest from './Pages/FormTest'
import 'bootstrap/dist/css/bootstrap.min.css';
import DrawerMenu from './Componentes/DrawerMenu';

function App() {
   return (
      <div className="app-container">
         <DrawerMenu />
         <div className="form-container">
            <FormTest />
         </div>
      </div>
   )
}

export default App;
