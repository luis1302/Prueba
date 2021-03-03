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
import Typography from '@material-ui/core/Typography';

class AdmUsuarios extends Component {
      constructor() {
      super();
      this.state={
          usuarios:[],
          MostrarDialogoEditarUsuario: false,
          MostrarDialogoEliminarUsuario: false,
          user:'',
          password:'',
          passwordConfirmacion:'',
          nota:'',
          rol:'',
          open:false,
          open1:false,
          open2:false,
          consulta:'',
          buscar: '',
          opcion:'',
          resultado: ''
      }
      this.validarCampos = this.validarCampos.bind(this);
      this.abrirAlert=this.abrirAlert.bind(this);
      this.abrirAlertEliminar=this.abrirAlertEliminar.bind(this);
      this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
}

componentWillMount() {
  axios.get('http://127.0.0.1:8000/api/consultaGeneralUsuarios').then(res=>{
    const usuarios = res.data;
    if(usuarios.length > 0){
    this.setState({usuarios});
    }
    else{
      this.abrirAlertTabla();
      }
    });
  }

  validarCampos = () => {
    var resultado = true;
    if( this.state.user.length> 0 && this.state.password.length >= 5
        && this.state.rol.length> 0 && this.state.password === this.state.passwordConfirmacion) {
      resultado = false;
    }
    return resultado;
  }

  editarUsuario = () => {
    axios.put('http://localhost:8000/api/editarUsuario/'+this.state.id, {

          user: this.state.user,
          password: this.state.password,
          rol: this.state.rol
      })
      .then(res=>{
        axios.get('http://127.0.0.1:8000/api/consultaGeneralUsuarios').then(res=>{
             this.setState({usuarios:res.data, MostrarDialogoEditarUsuario:false});
               console.log(this.state.usuarios);
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
    this.setState({open1:false});
    this.setState({open:false});
    this.setState({open2:false});
  };

  eliminarUsuario = () =>  {

    axios.delete('http://localhost:8000/api/deleteUsuario/'+this.state.id, {

      })
      .then(res => {
        axios.get('http://127.0.0.1:8000/api/consultaGeneralUsuarios').then(res => {
               const usuarios = res.data;
               if(usuarios.length > 0){
               this.setState({usuarios,MostrarDialogoEliminarUsuario:false});
               }
               else{
                 this.setState({usuarios:[],MostrarDialogoEliminarUsuario:false});
                 this.abrirAlertTabla();
                 }
           });

    })
          .catch(function (error) {
              console.log(error);
          });
          this.abrirAlertEliminar();
  }

handleSubmit = event => {
  axios.get('http://localhost:8000/api/consultaGeneralUsuarios').then(res=>{
       this.setState({usuarios:res.data});
         console.log(this.state.usuarios);
     });
  }

  handleClose = () => {
    this.setState({MostrarDialogoEditarUsuario: false});
  };

  handleClose1 = () => {
    this.setState({MostrarDialogoEliminarUsuario: false});
  };

  setUser = eve => {
    this.setState({user:eve.target.value});
  }
  setPassword = eve => {
    this.setState({password:eve.target.value});
  }
  setPasswordConfirmacion = eve => {
    this.setState({passwordConfirmacion:eve.target.value});
  }
  setRol = eve => {
      this.setState({rol:eve.target.value});
  }

  obtenerUsuarioSeleccionada(id, posicion) {
    const usuarioSelecionadoEdi=this.state.usuarios[posicion];

    this.setState({
      id: usuarioSelecionadoEdi.id,
      user: usuarioSelecionadoEdi.user,
      password: usuarioSelecionadoEdi.password,
      rol: usuarioSelecionadoEdi.rol
    });
    this.setState({MostrarDialogoEditarUsuario: true});
  }

  obtenerUsuarioSeleccionadoEliminar(id, posicion) {
    const usuarioSelecionado=this.state.usuarios[posicion];

    this.setState({
      id: usuarioSelecionado.id,
      user: usuarioSelecionado.user,
      password: usuarioSelecionado.password,
      rol: usuarioSelecionado.rol
    });
    this.setState({MostrarDialogoEliminarUsuario: true});
  }
  password = event =>{
    if(this.state.password !== this.state.passwordConfirmacion ){
      this.setState({nota:'Las contraseñas no coinciden'});
    }
    else{
      this.setState({nota:''});
    }
  }

  abrirAlert(){
    this.setState({open:true});
  }
  abrirAlertEliminar(){
    this.setState({open1:true});
  }

  handleChange = event => {
      this.setState({ buscar: event.target.value});
    }

    setConsulta = evt =>{
      const consulta = evt.target.value;
      this.setState({mostrarText:false, mostrarRol:false});
            if(consulta === 'usuario'){
              this.setState({mostrarText:true, mostrarRol:false, consulta:evt.target.value});
            }
            else if (consulta === 'rol'){
              this.setState({mostrarRol:true, mostrarText:false, consulta:evt.target.value});
            }
            else if (consulta === 'todas'){
              this.setState({consulta:evt.target.value, mostrarRol:false, mostrarText:false});
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

      if (consulta === 'usuario'){
      axios.get("http://localhost:8000/api/consultaUsuario/" + busqueda).then(rest => {
        const usuarios = rest.data;
        if(usuarios.length > 0){
          this.setState({usuarios,buscar:'',mostrarText:false});
        }
        else{
          this.abrirAlertTabla();
          this.setState({buscar:'',mostrarText:false});
        }

        });
      }
      else if (consulta === 'rol') {
        axios.get("http://localhost:8000/api/consultaUsuarioRol/" + busqueda).then(rest => {
          const usuarios = rest.data;
          if(usuarios.length > 0){
            this.setState({usuarios,mostrarDisponibilidad:false});
          }
          else{
            this.abrirAlertTabla();
            this.setState({mostrarDisponibilidad:false});
          }

          });
      }
      else if (consulta === 'todas') {
        axios.get('http://localhost:8000/api/consultaGeneralUsuarios').then(res=>{
          const usuarios = res.data;
          if(usuarios.length > 0){
            this.setState({usuarios});
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

    <Dialog open={this.state.MostrarDialogoEditarUsuario} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><EditIcon/> Editar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Seleccione el o los campos que desee modificar del usuario.
              </DialogContentText>
              <TextField
              style={{marginTop: 20}}
              value={this.state.user}
              onChange={this.setUser}
              type="text" id="user"
              name="user"
              label="Usuario"
              margin="normal"
              fullWidth
              disabled='true'
              />
              <br></br>
              <br></br>
              <TextField
              value={this.state.password}
              onChange={this.setPassword}
              helperText="La contraseña debe tener al menos 5 caracteres"
              id="password"
              type="password"
              name="password"
              label="Contraseña"
              />
              <br></br>
              <TextField
                label="Repita la contraseña"
                type="password"
                value={this.state.passwordConfirmacion}
                onChange={this.setPasswordConfirmacion}
                onBlur={(e) => {this.password(e);}}
                margin="normal"
                name="id"
              />
              <Typography style={{marginTop:10,fontSize:10, textAlign:'justify', color:'red'}}>{this.state.nota}</Typography>
              <br></br>
              <InputLabel id="demo-simple-select-label3">Seleccione el rol</InputLabel>
                <Select
                value={this.state.rol}
                onChange={this.setRol}
                  id="tipo"
                  margin="dense"
                  disabled='true'
                >
                  <MenuItem value="admin" >Administrador</MenuItem>
                  <MenuItem value="usuario" >Usuario Normal</MenuItem>
              </Select>

              <br></br>
              <br></br>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.editarUsuario} color="primary" disabled={this.validarCampos()}>
                Guardar
              </Button>

            </DialogActions>
      </Dialog>
      <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
      <MuiAlert  onClose={this.cerrar} severity="success">
        Habitacion modificada correctamente.
      </MuiAlert>
      </Snackbar>
      <Dialog open={this.state.MostrarDialogoEliminarUsuario} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title" style={{color:"#bf360c" }}><DeleteIcon/> Eliminar Usuario</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  NOTA: una vez eliminado el usuario, se eliminara toda su informacion.
                </DialogContentText>
                <TextField
                style={{marginTop: 20}}
                label="Usuario"
                margin="normal"
                fullWidth
                disabled='true'
                value={this.state.user}
                onChange={this.setUser}
                type="text" id="user"
                />
                <br></br>
                <br></br>
                <TextField
                id="password"
                name="password"
                label="Contraseña"
                disabled='true'
                value={this.state.password}
                onChange={this.setPassword}
                />
                <br></br>
                <br></br>
                <InputLabel id="demo-simple-select-label3">Rol</InputLabel>
                  <Select
                  value={this.state.rol}
                  onChange={this.setRol}
                  disabled='true'
                    id="tipo"
                    margin="dense"
                  >
                    <MenuItem value="admin" >Administrador</MenuItem>
                    <MenuItem value="usuario" >Usuario Normal</MenuItem>
                </Select>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose1} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.eliminarUsuario} color="primary">
                  Borrar
                </Button>


              </DialogActions>
        </Dialog>
        <Snackbar open={this.state.open1} autoHideDuration={3000} onClose={this.cerrar}>
        <MuiAlert  onClose={this.cerrar} severity="success">
          Usuario eliminado correctamente.
        </MuiAlert>
        </Snackbar>
        <Grid container>
          <Grid>
          <GroupIcon style={{ fontSize: 50, color:"#bf360c"  }}/>
          </Grid>
          <Grid>
          <h3 style={{color:"#bf360c" }}>Administración de Usuarios</h3>
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
          <MenuItem value="todas" >Todos</MenuItem>
          <MenuItem value="usuario" >Usuario</MenuItem>
          <MenuItem value="rol" >Rol</MenuItem>
      </Select>


      <br></br>
      { this.state.mostrarRol ?
      <div>
      <br></br>
      <InputLabel style={{marginLeft:20}} id="demo-simple-select-label">Seleccione el Rol</InputLabel>
        <Select
          labelId="demo-simple-select"
          id="consulta"
          style={{marginLeft:20}}
          value={this.state.buscar}
          onChange={this.handleChange}
        >
          <MenuItem value="admin" >Administrador</MenuItem>
          <MenuItem value="usuario" >Usuario Normal</MenuItem>

       </Select></div> : ''
    }

      { this.state.mostrarText ?
        <Grid item xs={4}>
        <TextField
          label="Ingrese el usuario a buscar"
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
          <TableCell className="TableCell1" align="center">Numero</TableCell>
          <TableCell className="TableCell1" align="center">Usuario</TableCell>
          <TableCell className="TableCell1" align="center">Contraseña</TableCell>
            <TableCell className="TableCell1" align="center">Rol</TableCell>
            <TableCell className="TableCell1" align="center" colSpan={2}>Opciones</TableCell>
          </TableRow>
        </TableHead><TableBody>

      { this.state.usuarios.map((usuario, key) =>
          <TableRow key={key}>
          <TableCell align="center">{key+1} </TableCell>
            <TableCell align="center">{usuario.user} </TableCell>
            <TableCell align="center">{(usuario.password.replace(usuario.password,"*").padStart(usuario.password.length,"*"))} </TableCell>
            <TableCell align="center">{usuario.rol} </TableCell>
            <TableCell onClick={() => {this.obtenerUsuarioSeleccionada(usuario.id, key)}} align="right">
              <Button style={{marginTop: 10, color:'white', backgroundColor:' #f79845'}} variant="contained" color='primary' type="submit"><EditIcon/>Editar</Button>
            </TableCell>
            <TableCell onClick={() => {this.obtenerUsuarioSeleccionadoEliminar(usuario.id, key)}} align="left">
              <Button style={{marginTop: 10, color:'white', backgroundColor:'#bf360c'}} variant="contained" color='secondary' type="submit"><DeleteIcon/> Borrar</Button>
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
export default AdmUsuarios;
