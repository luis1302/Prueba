import React, {Component} from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import GroupIcon from '@material-ui/icons/Group';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import 'typeface-roboto';

class AdmHabitacion extends Component {
      constructor() {
      super();
      this.state={
          habitaciones:[],
          MostrarDialogoEditarHabitacion: false,
          MostrarDialogoEliminarHabitacion: false,
          MostrarDialogoAdministrarHabitacion: false,
          codigo:'',
          tipo:'',
          valor:'',
          numero_personas:'',
          descripcion:'',
          disponibilidad:'',
          limpieza:'',
          open:false,
          openCerrar:false,
          openModificar:false,
          open2:false,
          consulta:'',
          buscar: '',
          opcion:'',
          resultado: ''
      }
      this.abrirAlertModificar=this.abrirAlertModificar.bind(this);
      this.abrirAlertCerrar=this.abrirAlertCerrar.bind(this);
      this.abrirAlert=this.abrirAlert.bind(this);
      this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
  }

  componentWillMount() {
    const rol = sessionStorage.getItem('rol');
    this.setState({rol});
    axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res=>{
         this.setState({habitaciones:res.data});
       });
  }

  editarHabitacion = () => {
    axios.put('http://localhost:8000/api/editarHabitacion/'+this.state.codigo, {

          tipo: this.state.tipo,
          valor: this.state.valor,
          numero_personas: this.state.numero_personas,
          descripcion: this.state.descripcion,
          disponibilidad: this.state.disponibilidad,
          limpieza: this.state.limpieza
      })
      .then(res=>{
        axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res=>{
             this.setState({habitaciones:res.data, MostrarDialogoEditarHabitacion:false, MostrarDialogoAdministrarHabitacion:false});
               console.log(this.state.habitaciones);
    });
  })
          .catch(function (error) {
              console.log(error);
          });
          this.abrirAlertModificar();
  }

  cerrar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open1:false});
    this.setState({open:false});
    this.setState({openCerrar:false});
    this.setState({openModificar:false});
    this.setState({open2:false});
  };

  eliminarHabitacion = () =>  {
    axios.delete('http://localhost:8000/api/eliminarHabitacion/'+this.state.codigo, {
      })
      .then(res => {
        axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res => {
             this.setState({habitaciones:res.data, MostrarDialogoEliminarHabitacion:false});
               console.log(this.state.habitaciones);
           });
    })
          .catch(function (error) {
              console.log(error);
          });
          this.abrirAlertCerrar();
  }

  handleSubmit = event => {
    axios.get('http://localhost:8000/api/consultaHabitaciones').then(res=>{
         this.setState({habitaciones:res.data});
           console.log(this.state.habitaciones);
       });
    }

  handleClose = () => {
    this.setState({MostrarDialogoEditarHabitacion: false});
  };

  handleClose1 = () => {
    this.setState({MostrarDialogoEliminarHabitacion: false});
  };

  handleClose0 = () => {
    this.setState({MostrarDialogoAdministrarHabitacion: false});
  };

  setCodigo = eve => {
    this.setState({codigo:eve.target.value});
  }

  setTipo = eve => {
    this.setState({tipo:eve.target.value});
  }

  setValor = eve => {
    this.setState({valor:eve.target.value});
  }

  setNumero_personas = eve => {
    this.setState({numero_personas:eve.target.value});
  }

  setDescripcion = eve => {
    this.setState({descripcion:eve.target.value});
  }

  setDisponibilidad = eve => {
    this.setState({disponibilidad:eve.target.value});
  }

  setLimpieza = eve => {
    this.setState({limpieza:eve.target.value});
  }

  obtenerHabitacionSeleccionadaAdministracion(codigo, posicion) {
    const habitacionSelecionadaEdi=this.state.habitaciones[posicion];

    this.setState({
      codigo: habitacionSelecionadaEdi.codigo,
      tipo: habitacionSelecionadaEdi.tipo,
      valor: habitacionSelecionadaEdi.valor,
      numero_personas: habitacionSelecionadaEdi.numero_personas,
      descripcion: habitacionSelecionadaEdi.descripcion,
      disponibilidad: habitacionSelecionadaEdi.disponibilidad,
      limpieza: habitacionSelecionadaEdi.limpieza
    });
    this.setState({MostrarDialogoAdministrarHabitacion: true});
  }

  obtenerHabitacionSeleccionada(codigo, posicion) {
    const habitacionSelecionadaEdi=this.state.habitaciones[posicion];
    this.setState({
      codigo: habitacionSelecionadaEdi.codigo,
      tipo: habitacionSelecionadaEdi.tipo,
      valor: habitacionSelecionadaEdi.valor,
      numero_personas: habitacionSelecionadaEdi.numero_personas,
      descripcion: habitacionSelecionadaEdi.descripcion,
      disponibilidad: habitacionSelecionadaEdi.disponibilidad,
      limpieza: habitacionSelecionadaEdi.limpieza
    });
    this.setState({MostrarDialogoEditarHabitacion: true});
  }

  obtenerHabitacionSeleccionadaEliminar(codigo, posicion) {
    const habitacionSelecionada=this.state.habitaciones[posicion];

    this.setState({
      codigo: habitacionSelecionada.codigo,
      tipo: habitacionSelecionada.tipo,
      valor: habitacionSelecionada.valor,
      numero_personas: habitacionSelecionada.numero_personas,
      descripcion: habitacionSelecionada.descripcion,
      disponibilidad: habitacionSelecionada.disponibilidad,
      limpieza: habitacionSelecionada.limpieza
    });
    this.setState({MostrarDialogoEliminarHabitacion: true});
  }

  abrirAlert(){
    this.setState({open:true});
  }

  abrirAlertCerrar(){
    this.setState({openCerrar:true});
  }

  abrirAlertModificar(){
    this.setState({openModificar:true});
  }

  handleChange = event => {
      this.setState({ buscar: event.target.value});
  }

  setConsulta = evt =>{
    const consulta = evt.target.value;
    this.setState({mostrarText:false, mostrarDisponibilidad:false, mostrarLimpieza:false, mostrarTextPrecio:false});
          if(consulta === 'codigo'){
            this.setState({mostrarText:true, mostrarTextPrecio:false, mostrarDisponibilidad:false, mostrarLimpieza:false, consulta:evt.target.value});
          }
          else if (consulta === 'disponibilidad'){
            this.setState({mostrarDisponibilidad:true, mostrarTextPrecio:false, mostrarText:false, mostrarLimpieza:false, consulta:evt.target.value});
          }
          else if (consulta === 'limpieza'){
            this.setState({consulta:evt.target.value, mostrarTextPrecio:false, mostrarDisponibilidad:false, mostrarText:false, mostrarLimpieza:true});
          }
          else if (consulta === 'valor'){
            this.setState({consulta:evt.target.value, mostrarTextPrecio:true, mostrarDisponibilidad:false, mostrarText:false, mostrarLimpieza:false});
          }
          else if (consulta === 'todas'){
            this.setState({consulta:evt.target.value, mostrarTextPrecio:false, mostrarDisponibilidad:false, mostrarText:false, mostrarLimpieza:false});
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

    if (consulta === 'codigo'){
    axios.get("http://localhost:8000/api/consultaCodigo/" + busqueda).then(rest => {
      const habitaciones = rest.data;
      if(habitaciones.length > 0){
        this.setState({habitaciones,buscar:'',mostrarText:false});
      }
      else{
        this.abrirAlertTabla();
        this.setState({buscar:'',mostrarText:false});
      }

      });
    }
    else if (consulta === 'valor') {
      axios.get("http://localhost:8000/api/consultaValor/" + busqueda).then(rest => {
        const habitaciones = rest.data;
        if(habitaciones.length > 0){
          this.setState({habitaciones,buscar:'',mostrarTextPrecio:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({buscar:'',mostrarTextPrecio:false});
        }
        });
    }
    else if (consulta === 'disponibilidad') {
      axios.get("http://localhost:8000/api/consultaDisponibilidad/" + busqueda).then(rest => {
        const habitaciones = rest.data;
        if(habitaciones.length > 0){
          this.setState({habitaciones,mostrarDisponibilidad:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({mostrarDisponibilidad:false});
        }

        });
    }
    else if (consulta === 'limpieza') {
      axios.get("http://localhost:8000/api/consultaLimpieza/" + busqueda).then(rest => {
        const habitaciones = rest.data;
        if(habitaciones.length > 0){
          this.setState({habitaciones,mostrarLimpieza:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({mostrarLimpieza:false});
        }

        });
    }
    else if (consulta === 'todas') {
      axios.get('http://localhost:8000/api/consultaHabitaciones').then(res=>{
        const habitaciones = res.data;
        if(habitaciones.length > 0){
          this.setState({habitaciones});
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
    <Dialog open={this.state.MostrarDialogoAdministrarHabitacion} onClose={this.handleClose0} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><EditIcon/> Administrar Habitación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Se puede cambiar la disponibilidad y limpieza de la habitación
              </DialogContentText>
              <TextField
              style={{marginTop: 20}}
              name="codigo"
              label="Ingrese el numero de habitación"
              margin="normal"
              fullWidth
              helperText = "Ejem: Habitacion 200"
              disabled
              value={this.state.codigo}
              onChange={this.setCodigo}
              />
              <br></br>
              <br></br>
              <TextField
              name="numero_personas"
              label="Cantidad de personas"
              disabled
              value={this.state.numero_personas}
              onChange={this.setNumero_personas}
              />
              <br></br>
              <br></br>
              <TextField
              name="valor"
              label="Ingrese el precio de la habitación"
              helperText = "Ejem: 10.00"
              disabled
              fullWidth
              value={this.state.valor}
              onChange={this.setValor}
              />
              <br></br>
              <br></br>
              <TextField
              name="descripcion"
              label="Descripción de la Habitación"
              helperText = "Que incluye? Ejem: Aire Acondicionado, Agua Caliente, etc."
              fullWidth
              disabled
              value={this.state.descripcion}
              onChange={this.setDescripcion}
              />
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label3">Tipo de Habitación</InputLabel>
                <Select
                  margin="dense"
                  disabled
                  value={this.state.tipo}
                  onChange={this.setTipo}
                >
                  <MenuItem value="Sencilla" >Sencilla</MenuItem>
                  <MenuItem value="Doble" >Doble</MenuItem>
                  <MenuItem value="Triple" >Triple</MenuItem>
              </Select>
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label">Disponibilidad</InputLabel>
                <Select
                  value={this.state.disponibilidad}
                  onChange={this.setDisponibilidad}
                >
                  <MenuItem value="Si" >Si</MenuItem>
                  <MenuItem value="No" >No</MenuItem>
              </Select>
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label2">Requiere limpieza</InputLabel>
                <Select
                  value={this.state.limpieza}
                  onChange={this.setLimpieza}
                >
                  <MenuItem value="No Requiere" >No Requiere</MenuItem>
                  <MenuItem value="Requiere" >Requiere</MenuItem>
              </Select>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose0} color="primary">
                Cancel
              </Button>
              <Button onClick={this.editarHabitacion} color="primary">
                Guardar
              </Button>
            </DialogActions>
      </Dialog>


    <Dialog open={this.state.MostrarDialogoEditarHabitacion} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><EditIcon/> Editar Habitación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Seleccione el o los campos que desee modificar de la habitación.
              </DialogContentText>
              <TextField
              style={{marginTop: 20}}
              value={this.state.codigo}
              onChange={this.setCodigo}
              type="text" id="codigo"
              name="codigo"
              label="Ingrese el numero de habitación"
              margin="normal"
              fullWidth
              helperText = "Ejem: Habitacion 200"
              disabled='true'
              />
              <br></br>
              <br></br>
              <TextField
              value={this.state.numero_personas}
              onChange={this.setNumero_personas}
              id="numero_personas"
              type="text"
              name="numero_personas"
              label="Cantidad de personas"
              />
              <br></br>
              <br></br>
              <TextField
              value={this.state.valor}
              onChange={this.setValor}
              id="valor"
              name="valor"
              type="text"
              label="Ingrese el precio de la habitación"
              helperText = "Ejem: 10.00"
              fullWidth
              />
              <br></br>
              <br></br>
              <TextField
              value={this.state.descripcion}
              onChange={this.setDescripcion}
              id="descripcion"
              name="descripcion"
              type="text"
              label="Descripcion de la Habitación"
              helperText = "Que incluye? Ejem: Aire Acondicionado, Agua Caliente, etc."
              fullWidth
              />
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label3">Tipo de Habitación</InputLabel>
                <Select
                value={this.state.tipo}
                onChange={this.setTipo}
                  id="tipo"
                  margin="dense"
                >
                  <MenuItem value="Sencilla" >Sencilla</MenuItem>
                  <MenuItem value="Doble" >Doble</MenuItem>
                  <MenuItem value="Triple" >Triple</MenuItem>
              </Select>
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label">Disponibilidad</InputLabel>
                <Select
                value={this.state.disponibilidad}
                onChange={this.setDisponibilidad}
                  id="disponibilidad"
                >
                  <MenuItem value="Si" >Si</MenuItem>
                  <MenuItem value="No" >No</MenuItem>
              </Select>
              <br></br>
              <br></br>
              <InputLabel id="demo-simple-select-label2">Requiere limpieza</InputLabel>
                <Select
                value={this.state.limpieza}
                onChange={this.setLimpieza}
                  id="limpieza"
                >
                  <MenuItem value="No Requiere" >No Requiere</MenuItem>
                  <MenuItem value="Requiere" >Requiere</MenuItem>
              </Select>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.editarHabitacion} color="primary">
                Guardar
              </Button>
            </DialogActions>
      </Dialog>

      <Snackbar open={this.state.openModificar} autoHideDuration={1500} onClose={this.cerrar}>
      <MuiAlert  onClose={this.cerrar} severity="success">
        Habitación modificada correctamente.
      </MuiAlert>
      </Snackbar>

      <Dialog open={this.state.MostrarDialogoEliminarHabitacion} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><DeleteIcon/> Eliminar Habitación</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  NOTA: una vez eliminada la habitación, se eliminará toda su información.
                </DialogContentText>
                <TextField
                style={{marginTop: 20}}
                label="Ingrese el numero de habitación"
                margin="normal"
                fullWidth
                helperText = "Ejem: Habitación 200"
                value={this.state.codigo}
                onChange={this.setCodigo}
                type="text" id="codigo"
                disabled="true"
                />

                <TextField
                id="numero_personas"
                name="numero_personas"
                label="Cantidad de personas"
                value={this.state.numero_personas}
                onChange={this.setNumero_personas}
                disabled="true"
                />

                <TextField
                id="valor"
                name="valor"
                label="Ingrese el precio de la habitación"
                helperText = "Ejem: 10.00"
                fullWidth
                value={this.state.valor}
                onChange={this.setValor}
                disabled="true"
                />

                <TextField
                label="Descripción de la Habitación"
                helperText = "Que incluye? Ejem: Aire Acondicionado, Agua Caliente, etc."
                fullWidth
                value={this.state.descripcion}
                onChange={this.setDescripcion}
                disabled="true"
                />

                <InputLabel id="demo-simple">Tipo de Habitacion</InputLabel>
                  <Select
                    margin="dense"
                    value={this.state.tipo}
                    onChange={this.setTipo}
                    disabled="true"
                  >
                    <MenuItem value="Sencilla" >Sencilla</MenuItem>
                    <MenuItem value="Doble" >Doble</MenuItem>
                    <MenuItem value="Triple" >Triple</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-lab">Disponibilidad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="disponibilidad"
                    value={this.state.disponibilidad}
                    onChange={this.setDisponibilidad}
                    disabled="true"
                  >
                    <MenuItem value="Si" >Si</MenuItem>
                    <MenuItem value="No" >No</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-2">Requiere limpieza</InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="limpieza"
                    value={this.state.limpieza}
                    onChange={this.setLimpieza}
                    disabled="true"
                  >
                    <MenuItem value="No Requiere" >No Requiere</MenuItem>
                    <MenuItem value="Requiere" >Requiere</MenuItem>
                </Select>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose1} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.eliminarHabitacion} color="primary">
                  Borrar
                </Button>
                <Snackbar open={this.state.openCerrar} autoHideDuration={1500} onClose={this.cerrar}>
                <MuiAlert  onClose={this.cerrar} severity="success">
                  Habitación eliminada correctamente.
                </MuiAlert>
                </Snackbar>

              </DialogActions>
        </Dialog>
        <Grid container>
          <Grid>
          <GroupIcon style={{ fontSize: 50, color:"#bf360c"  }}/>
          </Grid>
          <Grid>
          <h3 style={{color:"#bf360c" }}>Administración de Habitaciones</h3>
          </Grid>
      </Grid>

      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Tipo de Busqueda</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.consulta}
          onChange={this.setConsulta}
        >
          <MenuItem value="todas" >Todas</MenuItem>
          <MenuItem value="codigo" >Numero de Habitacion</MenuItem>
          <MenuItem value="valor" >Precio</MenuItem>
          <MenuItem value="disponibilidad" >Disponibilidad</MenuItem>
          <MenuItem value="limpieza" >Limpieza</MenuItem>
      </Select>

      <br></br>
      { this.state.mostrarDisponibilidad ?
      <div>
      <br></br>
      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Disponible</InputLabel>
        <Select
          labelId="demo-simple-select"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.buscar}
          onChange={this.handleChange}
        >
          <MenuItem value="Si" >Si</MenuItem>
          <MenuItem value="No" >No</MenuItem>
       </Select></div> : ''
    }

    { this.state.mostrarLimpieza ?
    <div>
    <br></br>
    <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Requiere Limpieza</InputLabel>
      <Select
        labelId="demo-simple-select"
        id="consulta"
        style={{marginLeft:20}}
        value={this.state.buscar}
        onChange={this.handleChange}
      >
        <MenuItem value="No Requiere" >No Requiere</MenuItem>
        <MenuItem value="Requiere" >Requiere</MenuItem>

     </Select></div> : ''
  }

      { this.state.mostrarTextPrecio ?
        <Grid item xs={2}>
        <TextField
          label="Ingrese el precio a buscar"
          value={this.state.buscar}
          onChange={this.handleChange}
          margin="dense"
          fullWidth
          helperText="Ejem:10.20"
          style={{marginLeft:20}}
          type="text" name="id"
        /> </Grid>: ''

      }

      { this.state.mostrarText ?
        <Grid item xs={4}>
        <TextField
          label="Ingrese la habitación a buscar"
          helperText="Ejem:Habitacion200"
          fullWidth
          value={this.state.buscar}
          onChange={this.handleChange}
          margin="dense"
          size="medium"
          style={{marginLeft:20}}
          type="text" name="id"
        /></Grid> : ''

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
          <TableCell className="TableCell1" align="center">Numero de Habitación</TableCell>
            <TableCell className="TableCell1" align="center">Tipo</TableCell>
            <TableCell className="TableCell1" align="center">Precio</TableCell>
            <TableCell className="TableCell1" align="center">Cantidad de personas</TableCell>
            <TableCell className="TableCell1" align="center">Descripcion</TableCell>
            <TableCell className="TableCell1" align="center">Esta Disponible</TableCell>
            <TableCell className="TableCell1" align="center">Requiere Limpieza</TableCell>
            <TableCell className="TableCell1" align="center" colSpan={3}>Opciones</TableCell>
          </TableRow>
        </TableHead><TableBody>

      { this.state.habitaciones.map((habitacione, key) =>
          <TableRow key={key}>
            <TableCell align="center">{habitacione.codigo} </TableCell>
            <TableCell align="center">{habitacione.tipo} </TableCell>
            <TableCell align="center">{habitacione.valor} </TableCell>
            <TableCell align="center">{habitacione.numero_personas} </TableCell>
            <TableCell align="center">{habitacione.descripcion} </TableCell>
            <TableCell align="center">{habitacione.disponibilidad} </TableCell>
            <TableCell align="center">{habitacione.limpieza} </TableCell>
            {
              this.state.rol === 'admin'?
            <div>
            <TableCell onClick={() => {this.obtenerHabitacionSeleccionada(habitacione.codigo, key)}} align="right">
              <Button style={{marginTop: 10, color:'white', backgroundColor:' #f79845'}} variant="contained" color='primary' type="submit"><EditIcon/>Editar</Button>
            </TableCell>
            <TableCell onClick={() => {this.obtenerHabitacionSeleccionadaAdministracion(habitacione.codigo, key)}} align="right">
              <Button style={{marginTop: 10}} variant="contained" type="submit"><EditIcon/>Administrar</Button>
            </TableCell>
            <TableCell onClick={() => {this.obtenerHabitacionSeleccionadaEliminar(habitacione.codigo, key)}} align="right">
              <Button style={{marginTop: 10, color:'white', backgroundColor:'#bf360c'}} variant="contained" color='secondary' type="submit"><DeleteIcon/> Borrar</Button>
            </TableCell> </div> :
            <TableCell onClick={() => {this.obtenerHabitacionSeleccionadaAdministracion(habitacione.codigo, key)}} align="right">
              <Button style={{marginTop: 10}} variant="contained" type="submit"><EditIcon/>Administrar</Button>
            </TableCell>
         }

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
export default AdmHabitacion;
