import React from 'react';
import './App.css';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import AdmCliente from './components/clientes';
import Cliente from './components/clienteUI';
import Habitacion from './components/habitaciones';
import AdmHabitacion from './components/habitacionUI';
import Inicio from './components/inicio';
import Asignaciones from './components/asignaciones';
import KardexAsignaciones from './components/kardexAsignaciones';
import KardexFactura from './components/kardexFacturas';
import AdmAsignaciones from './components/asignacionesUI';
import AdmFacturas from './components/facturaUI';
import CheckOut from './components/asignacionesCheckOut';
import Reservas from './components/reservas';
import AdmReservas from './components/reservaUI';
import KardexReservas from './components/kardexReservas';
import Usuarios from './components/usuarios';
import AdmUsuarios from './components/usuarioUI';

import Login from './components/login';
import {  BrowserRouter as Router,
   Route, Switch, Redirect
} from "react-router-dom";


function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale="es" moment={moment}>
    <Router>

        <Redirect
            from="/"
            to="/login" />

<Switch>
            <Route path="/login" component={Login}/>
            <Route path="/principal" component={Inicio}/>
            <Route path="/admCliente" component={AdmCliente}/>
            <Route path="/cliente" component={Cliente}/>
            <Route path="/habitacion" component={Habitacion}/>
            <Route path="/admHabitacion" component={AdmHabitacion}/>
            <Route path="/asignar" component={Asignaciones}/>
            <Route path="/kardexDiario" component={KardexAsignaciones}/>
            <Route path="/consultaAsignaciones" component={AdmAsignaciones}/>
            <Route path="/CheckOUT" component={CheckOut}/>
            <Route path="/kardexFacturas" component={KardexFactura}/>
            <Route path="/admFacturas" component={AdmFacturas}/>
            <Route path="/reservas" component={Reservas}/>
            <Route path="/admreservas" component={AdmReservas}/>
            <Route path="/reservasDiarias" component={KardexReservas}/>
            <Route path="/usuarios" component={Usuarios}/>
            <Route path="/admUsuarios" component={AdmUsuarios}/>

        </Switch>
    </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
