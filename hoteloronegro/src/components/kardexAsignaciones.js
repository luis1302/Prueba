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

class KardexAsignaciones extends Component {
      constructor() {
      super();
      this.state={
          asignaciones:[],
          fechaConsultar: new Date().toISOString(),
          open2:false
      }
        this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
    }

    componentWillMount() {
        const busqueda = moment().format('YYYY-MM-DDTHH:mm');
        console.log("date: ", busqueda);
        axios.get("http://localhost:8000/api/kardex/" + busqueda).then(rest => {
          const asignaciones = rest.data;
          if(asignaciones.length > 0){
          console.log("asignacion busqueda por fecha: ", asignaciones);
          this.setState({asignaciones});
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
          <h3 align="center">Habitaciones ingresadas hoy {moment().format('YYYY-MM-DD')}</h3>
          <Table><TableHead>
              <TableRow>
              <TableCell className="TableCell1" align="center">N°</TableCell>
              <TableCell className="TableCell1" align="center">Id Cliente</TableCell>
                <TableCell className="TableCell1" align="center">Habitación</TableCell>
                <TableCell className="TableCell1" align="center">Fecha de Entrada</TableCell>
                <TableCell className="TableCell1" align="center">Hora de Entrada</TableCell>

              </TableRow>
            </TableHead><TableBody>

          { this.state.asignaciones.map((asignacion, key) =>
              <TableRow key={key}>
                <TableCell align="center">{key+1}</TableCell>
                <TableCell align="center">{asignacion.idCliente} </TableCell>
                <TableCell align="center">{asignacion.idHabitacion} </TableCell>
                <TableCell align="center">{asignacion.fechaEntrada} </TableCell>
                <TableCell align="center">{asignacion.horaEntrada} </TableCell>
              </TableRow>  ) }

          </TableBody></Table>
          <Snackbar open={this.state.open2} autoHideDuration={6000} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            No existen clientes ingresados el dia de HOY.
          </MuiAlert>
          </Snackbar>
          </div>
    );
  }
}

export default KardexAsignaciones;
