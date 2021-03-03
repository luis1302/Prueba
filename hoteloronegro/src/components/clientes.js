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

class AdmCliente extends Component {
      constructor() {
      super();
      this.state={
          clientes:[],
          MostrarDialogoEditarClientes: false,
          MostrarDialogoEliminarClientes: false,
          id:'',
          nombre:'',
          apellido:'',
          direccion:'',
          telefono:'',
          correo:'',
          open:false,
          openCerrar:false,
          open2:false,
          consulta:'id',
          buscar: '',
          opcion:'',
          resultado: ''
      }
      this.abrirAlert=this.abrirAlert.bind(this);
      this.abrirAlertCerrar=this.abrirAlertCerrar.bind(this);
      this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
}

  componentWillMount() {
    axios.get('http://127.0.0.1:8000/api/consulta').then(res=>{
      const clientes = res.data;
      if(clientes.length > 0){
      this.setState({clientes});
      }
      else{
        this.abrirAlertTabla();
        }
       });
    }

  editar = () =>  {
    axios.put('http://localhost:8000/api/editarCliente/'+this.state.id, {
          nombre: this.state.nombre,
          apellido: this.state.apellido,
          direccion: this.state.direccion,
          correo: this.state.correo,
          telefono: this.state.telefono
      })
      .then(res=>{
        axios.get('http://127.0.0.1:8000/api/consulta').then(res=>{
             this.setState({clientes:res.data, MostrarDialogoEditarClientes:false});
               console.log(this.state.clientes);
           });
    })
          .catch(function (error) {
              console.log(error);
          });
          this.abrirAlert();
  }

  cerrar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open:false});
    this.setState({openCerrar:false});
    this.setState({open2:false});
  };

  eliminar = () =>  {
    axios.delete('http://localhost:8000/api/eliminarCliente/'+this.state.id, {

      })
      .then(res=>{
        axios.get('http://127.0.0.1:8000/api/consulta').then(res=>{
          const clientes = res.data;
          if(clientes.length > 0){
          this.setState({clientes,MostrarDialogoEliminarClientes:false});
          }
          else{
            this.setState({clientes:[],MostrarDialogoEliminarClientes:false});
            this.abrirAlertTabla();
            }
           });

    })
          .catch(function (error) {
              console.log(error);

          });
          this.abrirAlertCerrar();
  }

  handleSubmit = event => {
  axios.get('http://localhost:8000/api/consulta').then(res=>{
       this.setState({clientes:res.data});
         console.log(this.state.clientes);
     });
  }

  handleClose = () => {
    this.setState({MostrarDialogoEditarClientes: false});
  };

  handleClose1 = () => {
    this.setState({MostrarDialogoEliminarClientes: false});
  };

  setId = eve => {
    this.setState({id: eve.target.value});
  }

  setNombre = eve => {
    this.setState({nombre: eve.target.value});
  }

  setApellido = eve => {
    this.setState({apellido: eve.target.value});
  }

  setDireccion = eve => {
    this.setState({direccion: eve.target.value});
  }

  setTelefono = eve => {
    this.setState({telefono: eve.target.value});
  }

  setCorreo = eve => {
    this.setState({correo: eve.target.value});
  }

  obtenerClienteSeleccionado(id, posicion) {
    const clienteSelecionado=this.state.clientes[posicion];
    console.log('clienteSelecionado: ', clienteSelecionado);

    this.setState({
      id: clienteSelecionado.id,
      nombre: clienteSelecionado.nombre,
      apellido: clienteSelecionado.apellido,
      direccion: clienteSelecionado.direccion,
      telefono:clienteSelecionado.telefono,
      correo: clienteSelecionado.correo
    });
    this.setState({MostrarDialogoEditarClientes: true});
  }

  obtenerClienteSeleccionadoEliminar(id, posicion) {
    const clienteSelecionado=this.state.clientes[posicion];
    console.log('clienteSelecionado: ', clienteSelecionado);

    this.setState({
      id: clienteSelecionado.id,
      nombre: clienteSelecionado.nombre,
      apellido: clienteSelecionado.apellido,
      direccion: clienteSelecionado.direccion,
      telefono:clienteSelecionado.telefono,
      correo: clienteSelecionado.correo
    });
    this.setState({MostrarDialogoEliminarClientes: true});
  }

  abrirAlert(){
    this.setState({open:true});
  }

  abrirAlertCerrar(){
    this.setState({openCerrar:true});
  }

  handleChange = event => {
      this.setState({ buscar: event.target.value});
  }

  setConsulta = evt =>{
    const consulta = evt.target.value;
    this.setState({mostrarText:false});
        if(consulta === 'todos'){
          this.setState({mostrarText:false,consulta:evt.target.value});
        }
        else{
          this.setState({mostrarText:true,consulta:evt.target.value});
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

    if (consulta === 'id'){
    axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
      const clientes = rest.data;
      if(clientes.length > 0){
      console.log("clientes busqueda por id: ", clientes);
      this.setState({clientes,buscar:'',mostrarText:false});
      }
      else{
        this.abrirAlertTabla();
        this.setState({buscar:'',mostrarText:false});
      }
    });
    }
    else if (consulta === 'nombre') {
      axios.get("http://localhost:8000/api/consultaClientesNombre/" + busqueda).then(rest => {
        const clientes = rest.data;
        if(clientes.length > 0){
        console.log("clientes busqueda por nombre: ", clientes);
        this.setState({clientes,buscar:'',mostrarText:false});
      }
      else{
        this.abrirAlertTabla();
        this.setState({buscar:'',mostrarText:false});
      }
        });
    }
    else if (consulta === 'apellido') {
      axios.get("http://localhost:8000/api/consultaClientesApellido/" + busqueda).then(rest => {
        const clientes = rest.data;
        if(clientes.length > 0){
        console.log("clientes busqueda por apellido: ", clientes);
        this.setState({clientes,buscar:'',mostrarText:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({buscar:'',mostrarText:false});
        }
        });
      }

      else if (consulta === 'todos') {
        axios.get('http://127.0.0.1:8000/api/consulta').then(res=>{
          const clientes = res.data;
          if(clientes.length > 0){
          this.setState({clientes});
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
    <Dialog open={this.state.MostrarDialogoEditarClientes} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><EditIcon/> Editar Cliente</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Seleccione el o los campos que desee modificar del cliente.
              </DialogContentText>
              <TextField
                label="Cedula o Pasaporte"
                value={this.state.id}
                onChange={this.setId}
                margin="normal"
                type="text" name="id"
                disabled
              />

              <TextField
                label="Nombre"
                value={this.state.nombre}
                onChange={this.setNombre}
                margin="normal"
                type="text" name="id"
              />

              <TextField
                label="Apellido"
                value={this.state.apellido}
                onChange={this.setApellido}
                margin="normal"
                type="text" name="id"
              />

              <TextField
                label="Direccion"
                value={this.state.direccion}
                onChange={this.setDireccion}
                margin="normal"
                type="text" name="id"
              />

              <TextField
                label="Telefono"
                value={this.state.telefono}
                onChange={this.setTelefono}
                margin="normal"
                type="text" name="id"
              />

              <TextField
                label="Correo"
                value={this.state.correo}
                onChange={this.setCorreo}
                margin="normal"
                type="text" name="id"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.editar} color="primary">
                Guardar
              </Button>
              <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
              <MuiAlert  onClose={this.cerrar} severity="success">
                Cliente modificado correctamente.
              </MuiAlert>
              </Snackbar>
            </DialogActions>
      </Dialog>

      <Dialog open={this.state.MostrarDialogoEliminarClientes} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><DeleteIcon/> Eliminar Cliente</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  NOTA: una vez eliminado el cliente, se eliminara toda su informacion.
                </DialogContentText>
                <TextField
                  label="Cedula o Pasaporte"
                  value={this.state.id}
                  onChange={this.setId}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />

                <TextField
                  label="Nombre"
                  value={this.state.nombre}
                  onChange={this.setNombre}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />

                <TextField
                  label="Apellido"
                  value={this.state.apellido}
                  onChange={this.setApellido}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />

                <TextField
                  label="Direccion"
                  value={this.state.direccion}
                  onChange={this.setDireccion}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />

                <TextField
                  label="Telefono"
                  value={this.state.telefono}
                  onChange={this.setTelefono}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />

                <TextField
                  label="Correo"
                  value={this.state.correo}
                  onChange={this.setCorreo}
                  margin="normal"
                  type="text" name="id"
                  disabled="true"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose1} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.eliminar} color="primary">
                  Borrar
                </Button>
                <Snackbar open={this.state.openCerrar} autoHideDuration={1500} onClose={this.cerrar}>
                <MuiAlert  onClose={this.cerrar} severity="success">
                  Cliente eliminado correctamente.
                </MuiAlert>
                </Snackbar>

              </DialogActions>
        </Dialog>
        <Grid container>
          <Grid>
          <GroupIcon style={{ fontSize: 50, color:"#bf360c" }}/>
          </Grid>
          <Grid>
          <h3 style={{color:"#bf360c" }}>Administración de Clientes</h3>
          </Grid>
      </Grid>

      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Seleccionar</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.consulta}
          onChange={this.setConsulta}
        >
          <MenuItem value="todos" >Todos</MenuItem>
          <MenuItem value="id" >Cédula o Pasaporte</MenuItem>
          <MenuItem value="nombre" >Nombre</MenuItem>
          <MenuItem value="apellido" >Apellido</MenuItem>
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
          <TableCell className="TableCell1" align="center">Id</TableCell>
            <TableCell className="TableCell1" align="center">Nombre</TableCell>
            <TableCell className="TableCell1" align="center">Apellido</TableCell>
            <TableCell className="TableCell1" align="center">Dirección</TableCell>
            <TableCell className="TableCell1" align="center">Telefono</TableCell>
            <TableCell className="TableCell1" align="center">Correo</TableCell>
            <TableCell className="TableCell1" align="center" colSpan={2}>Opciones</TableCell>
          </TableRow>
        </TableHead><TableBody>

      { this.state.clientes.map((cliente, key) =>
          <TableRow key={key}>
            <TableCell align="center">{cliente.id} </TableCell>
            <TableCell align="center">{cliente.nombre} </TableCell>
            <TableCell align="center">{cliente.apellido} </TableCell>
            <TableCell align="center">{cliente.direccion} </TableCell>
            <TableCell align="center">{cliente.telefono} </TableCell>
            <TableCell align="center">{cliente.correo} </TableCell>

            <TableCell onClick={() => {this.obtenerClienteSeleccionado(cliente.id, key)}} align="right">
              <Button style={{marginTop: 10, color:'white', backgroundColor:' #f79845'}} variant="contained" type="submit"><EditIcon/>Editar</Button>
            </TableCell>
            <TableCell onClick={() => {this.obtenerClienteSeleccionadoEliminar(cliente.id, key)}} align="right">
              <Button style={{marginTop: 10, color:'white', backgroundColor:'#bf360c'}} variant="contained" type="submit"><DeleteIcon/> Borrar</Button>
            </TableCell>

          </TableRow>  ) }

      </TableBody></Table>
      <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
      <MuiAlert  onClose={this.cerrar} severity="error">
        No existen datos con la informacion indicada.
      </MuiAlert>
      </Snackbar>

    </div>
  );
}

}
export default AdmCliente;
