import React, {Component} from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import {DatePicker, TimePicker} from '@material-ui/pickers';
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
import BallotIcon from '@material-ui/icons/Ballot';
import 'typeface-roboto';

class AdmAsignaciones extends Component {
      constructor() {
      super();
      this.state={
          asignaciones:[],
          MostrarDialogoEliminarAsignaciones: false,
          mostrarBoton:false,
          buscarfechaEntrada: moment().format('YYYY-MM-DDTHH:mm'),
          buscarhoraEntrada: moment().format('YYYY-MM-DDTHH:mm'),
          id:'',
          idCliente:'',
          idHabitacion:'',
          fechaEntrada:'',
          fechaSalida:'',
          horaEntrada:'',
          horaSalida:'',
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
    axios.get('http://127.0.0.1:8000/api/consultaGeneralAsignacion').then(res=>{
         this.setState({asignaciones:res.data});
           console.log(this.state.asignaciones);
           const asignaciones = res.data;
           if(asignaciones.length > 0){
           this.setState({asignaciones});
           }
           else{
             this.abrirAlertTabla();
           }
       });
    }

  handleStartDateChange(date) {
    this.setState({buscarfechaEntrada:moment(date).format('YYYY-MM-DD'), buscarhoraEntrada: moment(date).format('YYYY-MM-DDTHH:mm')});
  }

  handleStartHourChange(time){
    var fechaInicio = new Date(this.state.buscarfechaEntrada);
    fechaInicio.setTime(new Date(time).getTime());
    this.setState({buscarhoraEntrada:moment(fechaInicio).format('YYYY-MM-DDTHH:mm') });
  }

  cerrar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open:false});
    this.setState({open2:false});
  };

  eliminar = () =>  {
    axios.delete('http://localhost:8000/api/borrarAsignacion/'+this.state.id, {

    }).then(res=>{
      axios.get('http://localhost:8000/api/consultaGeneralAsignacion').then(res=>{
        this.setState({asignaciones:res.data, MostrarDialogoEliminarAsignaciones:false});
      }).then(res=>{
        axios.put('http://localhost:8000/api/editarDisponibilidadOK/'+this.state.idHabitacion,{

        })
      });
    }).catch(function(error){
      console.log(error);
    });
    this.abrirAlert();

  }

  handleSubmit = event => {
  axios.get('http://localhost:8000/api/consultaGeneralAsignacion').then(res=>{
       this.setState({asignaciones:res.data});
         console.log(this.state.asignaciones);
     });
  }

  handleClose1 = () => {
    this.setState({MostrarDialogoEliminarAsignaciones: false});
  };

  setIdCliente = eve => {
    this.setState({idCliente: eve.target.value});
  }

  setIdHabitacion = eve => {
    this.setState({idHabitacion: eve.target.value});
  }

  setFechaEntrada = eve => {
    this.setState({fechaEntrada: eve.target.value});
  }

  setFechaSalida = eve => {
    this.setState({fechaSalida: eve.target.value});
  }

  setHoraEntrada = eve => {
    this.setState({horaEntrada: eve.target.value});
  }

  setHoraSalida = eve => {
    this.setState({horaSalida: eve.target.value});
  }

  obtenerHabitacionSeleccionadaEliminar(id, posicion) {
    const asignacionSelecionada=this.state.asignaciones[posicion];
    this.setState({
      id:asignacionSelecionada.id,
      idCliente: asignacionSelecionada.idCliente,
      idHabitacion: asignacionSelecionada.idHabitacion,
      fechaEntrada: asignacionSelecionada.fechaEntrada,
      horaEntrada: asignacionSelecionada.horaEntrada,
      fechaSalida:asignacionSelecionada.fechaSalida,
      horaSalida: asignacionSelecionada.horaSalida
    });
    this.setState({MostrarDialogoEliminarAsignaciones: true});
  }

  abrirAlert(){
    this.setState({open:true});
  }

  handleChange = event => {
    this.setState({ buscar: event.target.value});
  }

  setConsulta = evt =>{
    const consulta = evt.target.value;
    this.setState({mostrarText:false, mostrarDate:false, mostrarTime:false});
        if(consulta === 'idHabitacion'){
          this.setState({mostrarText:true,mostrarDate:false, mostrarTime:false, consulta:evt.target.value});
        }
        else if (consulta === 'idCliente'){
          this.setState({mostrarText:true,mostrarDate:false, mostrarTime:false, consulta:evt.target.value});
        }
        else if (consulta === 'fechaEntrada'){
          this.setState({mostrarText:false,mostrarDate:true, mostrarTime:false, consulta:evt.target.value});
        }
        else if (consulta === 'horaEntrada'){
          this.setState({mostrarText:false,mostrarDate:false, mostrarTime:true, consulta:evt.target.value});
        }
        else if (consulta === 'todas'){
          this.setState({mostrarText:false,mostrarDate:false, mostrarTime:false, consulta:evt.target.value});
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
    axios.get("http://localhost:8000/api/consultaIdCliente/" + busqueda).then(rest => {
      const asignaciones = rest.data;
      if(asignaciones.length > 0){
      this.setState({asignaciones,mostrarText:false,buscar:''});
      }
      else{
        this.abrirAlertTabla();
        this.setState({mostrarText:false,buscar:''});
      }
    });
    }
    else if (consulta === 'idHabitacion') {
      axios.get("http://localhost:8000/api/consultaIdHabitacion/" + busqueda).then(rest => {
        const asignaciones = rest.data;
        if(asignaciones.length > 0){
        this.setState({asignaciones,mostrarText:false,buscar:''});
      }
      else{
        this.abrirAlertTabla();
        this.setState({mostrarText:false,buscar:''});
      }
        });
    }
    else if (consulta === 'fechaEntrada') {
      axios.get("http://localhost:8000/api/consultaFechaEntrada/" + this.state.buscarfechaEntrada).then(rest => {
        const asignaciones = rest.data;
        if(asignaciones.length > 0){
        this.setState({asignaciones,mostrarDate:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({mostrarDate:false});
        }
        });
      }

      else if (consulta === 'horaEntrada') {
        axios.get("http://localhost:8000/api/consultaHoraEntrada/" + this.state.buscarhoraEntrada).then(rest => {
          const asignaciones = rest.data;
          if(asignaciones.length > 0){
          this.setState({asignaciones,mostrarTime:false});
          }
          else{
            this.abrirAlertTabla();
            this.setState({mostrarTime:false});
          }
          });
        }

        else if (consulta === 'todas') {
          axios.get('http://127.0.0.1:8000/api/consultaGeneralAsignacion').then(res=>{
            const asignaciones = res.data;
            if(asignaciones.length > 0){
            this.setState({asignaciones});
            }
            else{
              this.abrirAlertTabla();
            }
            });
          }
  }

render(){
  return (
    <div>
    <Principal/>
    <Dialog open={this.state.MostrarDialogoEliminarAsignaciones} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><DeleteIcon/> Eliminar Asignación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                NOTA: una vez eliminada la asignación, se eliminará toda su información.
              </DialogContentText>
              <TextField
                label="Cedula o Pasaporte"
                value={this.state.idCliente}
                onChange={this.setIdCliente}
                margin="normal"
                disabled
                type="text" name="id"
              />

                <TextField
                  label="Número Habitación"
                  value={this.state.idHabitacion}
                  onChange={this.setIdHabitacion}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Fecha de Entrada"
                  value={this.state.fechaEntrada}
                  onChange={this.setFechaEntrada}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Hora De Entrada"
                  value={this.state.horaEntrada}
                  onChange={this.setHoraEntrada}
                  margin="normal"
                  disabled
                  type="text" name="id"
                />

                <TextField
                  label="Hora de Salida"
                  disabled
                  value={this.state.horaSalida}
                  onChange={this.setHoraSalida}
                  margin="normal"
                  type="text" name="id"
                />

                <TextField
                  label="Fecha De Salida"
                  disabled
                  value={this.state.fechaSalida}
                  onChange={this.setFechaSalida}
                  margin="normal"
                  type="text" name="id"
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose1} color="primary">
                Cancel
              </Button>
              <Button onClick={this.eliminar} color="primary">
                Borrar
              </Button>
              <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
              <MuiAlert  onClose={this.cerrar} severity="success">
                Asignación eliminada correctamente.
              </MuiAlert>
              </Snackbar>
            </DialogActions>
      </Dialog>

        <Grid container>
          <Grid>
          <BallotIcon style={{ fontSize: 50, color:"#bf360c" }}/>
          </Grid>
          <Grid>
          <h3 style={{color:"#bf360c" }}>Administración de Asignaciones</h3>
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
          <MenuItem value="todas" >Todas</MenuItem>
          <MenuItem value="idCliente" >Id Cliente</MenuItem>
          <MenuItem value="idHabitacion">Número de Habitación</MenuItem>
          <MenuItem value="fechaEntrada">Fecha Entrada</MenuItem>
          <MenuItem value="horaEntrada">Hora Entrada</MenuItem>
      </Select>

      <br></br>
      { this.state.mostrarText ?
        <TextField
          label="Ingrese la informacion"
          value={this.state.buscar}
          onChange={this.handleChange}
          margin="normal"
          style={{marginLeft:20}}
          type="text" name="id"
        /> : ''
      }

      { this.state.mostrarDate ?
      <DatePicker
        value={this.state.buscarfechaEntrada}
        onChange={(e) => { this.handleStartDateChange(e); }}
        label="Fecha de Entrada"
        style={{marginLeft:20}}
        format="YYYY-MM-DD"
      /> : ''}

      {this.state.mostrarTime ?
      <TimePicker
        value={this.state.buscarhoraEntrada}
        onChange={(e) => { this.handleStartHourChange(e); }}
        label="Hora de Entrada"
        style={{marginLeft:20}}
        format="hh:mm A"
      /> : ''}

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
          <TableCell className="TableCell1" align="center">Id Cliente</TableCell>
            <TableCell className="TableCell1" align="center">Habitación</TableCell>
            <TableCell className="TableCell1" align="center">Fecha Entrada</TableCell>
            <TableCell className="TableCell1" align="center">Hora Entrada</TableCell>
            <TableCell className="TableCell1" align="center">Fecha Salida</TableCell>
            <TableCell className="TableCell1" align="center">Hora Salida</TableCell>
            <TableCell className="TableCell1" align="center">Opción</TableCell>
          </TableRow>
        </TableHead><TableBody>

      { this.state.asignaciones.map((asignacion, key) =>
          <TableRow key={key}>
            <TableCell align="center">{asignacion.idCliente} </TableCell>
            <TableCell align="center">{asignacion.idHabitacion} </TableCell>
            <TableCell align="center">{asignacion.fechaEntrada} </TableCell>
            <TableCell align="center">{asignacion.horaEntrada} </TableCell>
            <TableCell align="center">{asignacion.fechaSalida} </TableCell>
            <TableCell align="center">{asignacion.horaSalida} </TableCell>
            <TableCell align="center">
            {
              asignacion.estado === 'activo'?
            <Button  onClick={() => {this.obtenerHabitacionSeleccionadaEliminar(asignacion.id, key)}} style={{color:'white', backgroundColor:'#bf360c'}} variant="contained" color='secondary' type="submit">
              <DeleteIcon/> Borrar
            </Button>: ''
         }
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
export default AdmAsignaciones;
