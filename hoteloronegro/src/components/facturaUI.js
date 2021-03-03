import React, {Component} from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import {DatePicker} from '@material-ui/pickers';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import 'typeface-roboto';

class AdmFacturas extends Component {
      constructor() {
      super();
      this.state={
          facturas:[],
          MostrarDialogoAnularFactura: false,
          mostrarBoton:false,
          buscarfechaEmision: moment().format('YYYY-MM-DDTHH:mm'),
          id:'',
          idCliente:'',
          nombre:'',
          apellido:'',
          fechaEmision:'',
          subtotal:'',
          iva:'',
          total:'',
          estado:'',
          open:false,
          open2:false,
          consulta:'',
          buscar: '',
          opcion:'',
          resultado: ''
      }
      this.abrirAlert=this.abrirAlert.bind(this);
      this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
}

componentWillMount() {
  axios.get('http://127.0.0.1:8000/api/consultaFacturas').then(res=>{
       this.setState({facturas:res.data});
         console.log(this.state.facturas);
         const facturas = res.data;
         if(facturas.length > 0){
         this.setState({facturas});
         }
         else{
           this.abrirAlertTabla();
         }
     });
  }

  handleStartDateChange(date) {
    this.setState({buscarfechaEmision:moment(date).format('YYYY-MM-DD')});
  }

  cerrar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open:false});
    this.setState({open2:false});
  };

  anular = () =>  {
    axios.put('http://localhost:8000/api/AnularFactura/'+this.state.id.toString().padStart(8,"0"), {

    }).then(res=>{
      axios.get('http://localhost:8000/api/consultaFacturas').then(res=>{
        this.setState({facturas:res.data, MostrarDialogoAnularFactura:false});
      });
    }).catch(function(error){
      console.log(error);
    });
    this.abrirAlert();
  }

  handleClose1 = () => {
    this.setState({MostrarDialogoAnularFactura: false});
  };

  setIdCliente = eve => {
    this.setState({idCliente: eve.target.value});
  }

  setId = eve => {
    this.setState({id: eve.target.value});
  }

  setFechaEmision = eve => {
    this.setState({fechaEmision: eve.target.value});
  }

  setNombre = eve => {
    this.setState({nombre: eve.target.value});
  }

  setApellido = eve => {
    this.setState({apellido: eve.target.value});
  }

  setSubtotal = eve => {
    this.setState({subtotal: eve.target.value});
  }

  setIva = eve => {
    this.setState({iva: eve.target.value});
  }

  setTotal = eve => {
    this.setState({total: eve.target.value});
  }

  obtenerFacturaSeleccionadaEliminar(id, posicion) {
    const facturaSeleccionada=this.state.facturas[posicion];
    this.setState({
      id:facturaSeleccionada.id,
      idCliente: facturaSeleccionada.idCliente,
      nombre: facturaSeleccionada.nombre,
      apellido: facturaSeleccionada.apellido,
      fechaEmision: facturaSeleccionada.fechaEmision,
      subtotal:facturaSeleccionada.subtotal,
      iva: facturaSeleccionada.iva,
      total:facturaSeleccionada.total,
      estado:facturaSeleccionada.estado
    });
    this.setState({MostrarDialogoAnularFactura: true});
  }

  abrirAlert(){
    this.setState({open:true});
  }

  handleChange = event => {
    this.setState({ buscar: event.target.value});
  }

  setConsulta = evt =>{
    const consulta = evt.target.value;
    this.setState({mostrarText:false, mostrarDate:false, mostrarEstado:false});
        if(consulta === 'numeroFactura'){
          this.setState({mostrarText:true,mostrarDate:false, mostrarEstado:false, consulta:evt.target.value});
        }
        else if (consulta === 'idCliente'){
          this.setState({mostrarText:true,mostrarDate:false, mostrarEstado:false, consulta:evt.target.value});
        }
        else if (consulta === 'fechaEmision'){
          this.setState({mostrarText:false,mostrarDate:true, mostrarEstado:false, consulta:evt.target.value});
        }
        else if (consulta === 'estado'){
          this.setState({mostrarText:false,mostrarDate:false, mostrarEstado:true, consulta:evt.target.value});
        }
        else if (consulta === 'todas'){
          this.setState({mostrarText:false,mostrarDate:false, mostrarEstado:false, consulta:evt.target.value});
        }
    }

    consultar = event => {
      this.setState({opcion: event.target.value});
    };

    abrirAlertTabla(){
      this.setState({open2:true});
    }

    busquedaParametros = event => {
      const busqueda =  this.state.buscar;
      const consulta =  this.state.consulta;

      if (consulta === 'idCliente'){
      axios.get("http://localhost:8000/api/facturaIdCliente/" + busqueda).then(rest => {
        const facturas = rest.data;
        if(facturas.length > 0){
        this.setState({facturas,buscar:'',mostrarText:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({buscar:'',mostrarText:false});
        }
      });
      }
      else if (consulta === 'numeroFactura') {
        axios.get("http://localhost:8000/api/facturaId/" + busqueda).then(rest => {
          const facturas = rest.data;
          if(facturas.length > 0){
          this.setState({facturas,buscar:'',mostrarText:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({buscar:'',mostrarText:false});
        }
          });
      }
      else if (consulta === 'fechaEmision') {
        axios.get("http://localhost:8000/api/facturaFechaEmision/" + this.state.buscarfechaEmision).then(rest => {
          const facturas = rest.data;
          if(facturas.length > 0){
          this.setState({facturas,mostrarDate:false});
          }
          else{
            this.abrirAlertTabla();
            this.setState({mostrarDate:false});
          }
          });
        }

        else if (consulta === 'estado') {
          axios.get("http://localhost:8000/api/facturaEstado/" + busqueda).then(rest => {
            const facturas = rest.data;
            if(facturas.length > 0){
            this.setState({facturas, mostrarEstado:false});
            }
            else{
              this.abrirAlertTabla();
              this.setState({mostrarEstado:false});
            }
            });
          }

          else if (consulta === 'todas') {
            axios.get('http://127.0.0.1:8000/api/consultaFacturas').then(res=>{
              const facturas = res.data;
              if(facturas.length > 0){
              this.setState({facturas, mostrarEstado:false});
              }
              else{
                this.abrirAlertTabla();
                this.setState({mostrarEstado:false});
              }
              });
            }
    }

render(){
  return (
    <div>
    <Principal/>
    <Dialog open={this.state.MostrarDialogoAnularFactura} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><DeleteIcon/> Anular Factura</DialogTitle>
            <DialogContent>
              <DialogContentText>
                NOTA: una vez anulada la Factura, no se podrá realizar cambios.
              </DialogContentText>
              <TextField
                label="Numero de Factura"
                value={this.state.id.toString().padStart(8,"0")}
                onChange={this.setId.toString().padStart(8,"0")}
                margin="normal"
                disabled
                type="text" name="id"
              />

              <TextField
                label="Cedula o Pasaporte"
                value={this.state.idCliente}
                onChange={this.setIdCliente}
                margin="normal"
                disabled
                type="text" name="id"
              />

                <TextField
                  label="Nombre"
                  value={this.state.nombre}
                  onChange={this.setNombre}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Apellido"
                  value={this.state.apellido}
                  onChange={this.setApellido}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Fecha De Emisión"
                  value={this.state.fechaEmision}
                  onChange={this.setFechaEmision}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Subtotal"
                  value={this.state.subtotal}
                  onChange={this.setSubtotal}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Iva"
                  value={this.state.iva}
                  onChange={this.setIva}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Total"
                  value={this.state.total}
                  onChange={this.setTotal}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose1} color="primary">
                Cancel
              </Button>
              <Button onClick={this.anular} color="primary">
                Anular
              </Button>
              <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
              <MuiAlert  onClose={this.cerrar} severity="success">
                Factura anulada correctamente.
              </MuiAlert>
              </Snackbar>
            </DialogActions>
      </Dialog>

        <Grid container>
          <Grid>
          <AssessmentIcon style={{ fontSize: 50, color:"#bf360c" }}/>
          </Grid>
          <Grid>
          <h3 style={{color:"#bf360c" }}>Administración de Facturas</h3>
          </Grid>
      </Grid>

      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Seleccionar el tipo de busqueda</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.consulta}
          onChange={this.setConsulta}
        >
          <MenuItem value="todas">Todas</MenuItem>
          <MenuItem value="numeroFactura" >Número Factura</MenuItem>
          <MenuItem value="idCliente" >Id Cliente</MenuItem>
          <MenuItem value="fechaEmision">Fecha Emision</MenuItem>
          <MenuItem value="estado">Estado</MenuItem>
      </Select>

      <br></br>
      { this.state.mostrarText ?
        <TextField
          label="Ingrese la información"
          value={this.state.buscar}
          onChange={this.handleChange}
          margin="normal"
          style={{marginLeft:20}}
          type="text" name="id"
        /> : ''
      }

      { this.state.mostrarDate ?
      <DatePicker
        value={this.state.buscarfechaEmision}
        onChange={(e) => { this.handleStartDateChange(e); }}
        label="Fecha de Entrada"
        style={{marginLeft:20}}
        format="YYYY-MM-DD"
      /> : ''}

      { this.state.mostrarEstado ?
      <div>
      <br></br>
      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Estado</InputLabel>
        <Select
          labelId="demo-simple-select"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.buscar}
          onChange={this.handleChange}
        >
          <MenuItem value="Correcto" >Correcto</MenuItem>
          <MenuItem value="Anulada" >Anulada</MenuItem>
       </Select></div> : ''
    }

      <br></br>
      <br></br>
      <Button style={{marginLeft:20}} variant="contained" type="submit" onClick={this.busquedaParametros}>
      <SearchIcon/>
        Consultar
      </Button>
      <br></br>
      <br></br>

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
          <TableCell className="TableCell1" align="center">Opción</TableCell>
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
            <TableCell align="center">
            <Button disabled={factura.estado === 'Anulada' ? true : false} onClick={() => {this.obtenerFacturaSeleccionadaEliminar(factura.id, key)}} style={{marginTop: 10, color:'white', backgroundColor:factura.estado === 'Correcto' ? '#bf360c' : 'white'}} variant="contained" color='secondary' type="submit">
              <HighlightOffIcon/> Anular
            </Button>
            </TableCell>
          </TableRow>  ) }

      </TableBody></Table>
      <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
      <MuiAlert  onClose={this.cerrar} severity="error">
        No existen datos con la información indicada.
      </MuiAlert>
      </Snackbar>
    </div>
  );
}

}
export default AdmFacturas;
