import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';


class KardexReservas extends Component {
      constructor() {
      super();
      this.state={
          reservas:[],
          open2:false
      }
        this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
    }

    componentWillMount() {
        const busqueda = moment().format('YYYY-MM-DDTHH:mm');
        console.log("date: ", busqueda);
        axios.get("http://localhost:8000/api/kardexReservas/" + busqueda).then(rest => {
          const reservas = rest.data;
          if(reservas.length > 0){
          this.setState({reservas});
          }
          else{
            this.abrirAlertTabla();
          }
        });
      }

    cerrar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({open2:false});
    };

    abrirAlertTabla(){
      this.setState({open2:true});
    }

  render() {
    return (
          <div>
          <Principal />
          <h3 align="center">Reservas para el día de hoy {moment().format('YYYY-MM-DD')}</h3>
          <Table><TableHead>
              <TableRow>
              <TableCell className="TableCell1" align="center">Habitación</TableCell>
                <TableCell className="TableCell1" align="center">Id Cliente</TableCell>
                <TableCell className="TableCell1" align="center">Fecha Entrada</TableCell>
                <TableCell className="TableCell1" align="center">Fecha Salida</TableCell>

              </TableRow>
            </TableHead><TableBody>

          { this.state.reservas.map((reserva, key) =>
              <TableRow key={key}>
                <TableCell align="center">{reserva.idHabitacion}</TableCell>
                <TableCell align="center">{reserva.idCliente} </TableCell>
                <TableCell align="center">{reserva.fechaEntrada} </TableCell>
                <TableCell align="center">{reserva.fechaSalida} </TableCell>
              </TableRow>  ) }

          </TableBody></Table>
          <Snackbar open={this.state.open2} autoHideDuration={6000} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            No existen Reservas registradas el día de HOY {moment().format('YYYY-MM-DD')}.
          </MuiAlert>
          </Snackbar>
          </div>
    );
  }
}

export default KardexReservas;
