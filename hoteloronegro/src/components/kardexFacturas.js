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


class KardexFactura extends Component {
      constructor() {
      super();
      this.state={
          facturas:[],
          fechaConsultar: new Date().toISOString(),
          open2:false
      }
        this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
    }

    componentWillMount() {
        const busqueda = moment().format('YYYY-MM-DDTHH:mm');
        console.log("date: ", busqueda);
        axios.get("http://localhost:8000/api/kardexFacturas/" + busqueda).then(rest => {
          const facturas = rest.data;
          if(facturas.length > 0){
          console.log("asignacion busqueda por fecha: ", facturas);
          this.setState({facturas});
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

    mostrarIdFactura (id) {
      return id.toString().padStart(8,"0");
    }

  render() {
    return (
          <div>
          <Principal />
          <h3 align="center">Facturas realizadas hoy {moment().format('YYYY-MM-DD')}</h3>
          <Table><TableHead>
              <TableRow>
              <TableCell className="TableCell1" align="center">Número de Factura</TableCell>
              <TableCell className="TableCell1" align="center">Id Cliente</TableCell>
                <TableCell className="TableCell1" align="center">Nombre</TableCell>
                <TableCell className="TableCell1" align="center">Apellido</TableCell>
                <TableCell className="TableCell1" align="center">Fecha Emisión</TableCell>
                <TableCell className="TableCell1" align="center">Subtotal</TableCell>
                <TableCell className="TableCell1" align="center">Iva</TableCell>
                <TableCell className="TableCell1" align="center">Total</TableCell>
                <TableCell className="TableCell1" align="center">Estado</TableCell>
              </TableRow>
            </TableHead><TableBody>

          { this.state.facturas.map((factura, key) =>
              <TableRow key={key}>
                <TableCell align="center">{factura.id.toString().padStart(8,"0")}</TableCell>
                <TableCell align="center">{factura.idCliente} </TableCell>
                <TableCell align="center">{factura.nombre} </TableCell>
                <TableCell align="center">{factura.apellido} </TableCell>
                <TableCell align="center">{factura.fechaEmision} </TableCell>
                <TableCell align="center">{factura.subtotal} </TableCell>
                <TableCell align="center">{factura.iva} </TableCell>
                <TableCell align="center">{factura.total} </TableCell>
                <TableCell align="center" style={{color:factura.estado === 'Correcto' ? 'green' : 'red'}}>{factura.estado} </TableCell>

              </TableRow>  ) }

          </TableBody></Table>
          <Snackbar open={this.state.open2} autoHideDuration={6000} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            No existen facturas registradas el día de HOY {(this.state.fechaConsultar).substr(0,10)}.
          </MuiAlert>
          </Snackbar>
          </div>
    );
  }
}

export default KardexFactura;
