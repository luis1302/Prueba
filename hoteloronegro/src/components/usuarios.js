import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import usuario from '../images/usuario.png';
import Typography from '@material-ui/core/Typography';
class Usuarios extends Component {
      constructor() {
      super();
      this.state={
          usuarios:[],
          user:'',
          password:'',
          passwordConfirmacion:'',
          rol:'',
          advertencia:'',
          nota:'',
          open:false,
          open2:false,
          mostrarEdit: false
      }
      this.ingresar = this.ingresar.bind(this);
      this.setUser = this.setUser.bind(this);
      this.validarCampos = this.validarCampos.bind(this);
      this.setPassword=this.setPassword.bind(this);
      this.setPasswordConfirmacion=this.setPasswordConfirmacion.bind(this);
      this.usuarioControl = this.usuarioControl.bind(this);
      this.setRol=this.setRol.bind(this);
      this.abrirAlert=this.abrirAlert.bind(this);
    }

    setUser(evt){
      this.setState({user:evt.target.value});
    }

    setPassword(evt){
      this.setState({password:evt.target.value});
    }
    setPasswordConfirmacion(evt){
      this.setState({passwordConfirmacion:evt.target.value});
    }

   setRol(evt){
      this.setState({rol:evt.target.value});
    }

    usuarioControl(text) {
      const re = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
      return re.test(String(text));
    }

    password = event =>{
      if(this.state.password !== this.state.passwordConfirmacion ){
        this.setState({nota:'Las contraseñas no coinciden'});
      }
      else{
        this.setState({nota:''});
      }
    }
    validarCampos = () => {
      var resultado = true;
      if( this.state.user.length> 0 && this.usuarioControl(this.state.user) && this.state.password.length >= 5
          && this.state.rol.length> 0 && this.state.password === this.state.passwordConfirmacion) {
        resultado = false;
      }
      return resultado;
    }

    cerrar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({open:false});
      this.setState({open2:false});
    };

    abrirAlert(){
      this.setState({open:true});
    }

    abrirAlert2(){
      this.setState({open2:true});
    }

    ingresar() {
        const busqueda =  this.state.user;
        axios.get("http://localhost:8000/api/consultaUsuario/" + busqueda).then(rest => {
          const usuarios = rest.data;
          this.setState({usuarios});
          if(usuarios.length > 0){
            this.abrirAlert2();
          }
          else{
            axios.post("http://localhost:8000/api/guardarUsuario", {
                  user: this.state.user,
                  password: this.state.password,
                  rol: this.state.rol

              })
              .then(res=>{
                this.setState({user:'',password:'',rol:''})
                console.log(res.data);
              })
                  .catch(function (error) {
                      console.log(error);
                  });
                  this.abrirAlert();
              }
          });
      }

  render() {
    return (
          <div>
          <Principal/>
          <Container maxWidth="sm">
          <Grid container spacing={3} style={{marginTop:50}}>
          <Grid item xs={12}>
          <img src={usuario} height="120" style={{marginLeft:180}} alt="user"/>
          </Grid>
          <Grid item xs={7}>
          <TextField
          style={{marginTop: 20}}
          id="user"
          name="user"
          label="Nombre del usuario"
          margin="normal"
          fullWidth
          value={this.state.user}
          onChange={this.setUser}
          />
          </Grid>
            <Grid item xs={5}>
            <Typography style={{marginTop:10,fontSize:10, textAlign:'justify'}}>El Usuario debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                          NO puede tener otros símbolos Ejem: LRamirez285</Typography>
            </Grid>
          <Grid item xs = {7}>
          <TextField
          id="password"
          name="password"
          label="Ingrese una Contraseña"
          type="password"
          value={this.state.password}
          onChange={this.setPassword}
          />

          </Grid>
          <Grid item xs={5}>
          <Typography style={{marginTop:20, marginLeft:-100, fontSize:10, textAlign:'justify'}}>La contraseña debe tener al menos 5 caracteres</Typography>
          </Grid>
          <Grid item xs ={7}>
          <TextField
            fullWidth
            label="Ingrese nuevamente la contraseña"
            type="password"
            value={this.state.passwordConfirmacion}
            onChange={this.setPasswordConfirmacion}
            onBlur={(e) => {this.password(e);}}
            margin="normal"
            name="id"
          />
          <Typography style={{marginTop:10,fontSize:10, textAlign:'justify', color:'red'}}>{this.state.nota}</Typography>
          </Grid>
          <Grid item xs={6}>
          <InputLabel id="demo-simple-select-label3">Seleccione el Rol</InputLabel>
            <Select
              labelId="demo-simple-select-label3"
              id="tipo"
              margin="dense"
              value={this.state.rol}
              onChange={this.setRol}
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="usuario">Usuario Normal</MenuItem>
          </Select>
          </Grid>
          </Grid>
          <br></br>
          <Button
            onClick = {this.ingresar}
            style={{marginLeft:180, marginTop: 30, marginBottom:20}}
            variant="contained" type="submit"
            text-align="center"
            disabled={this.validarCampos()}
          >
              <SaveIcon/>
              Guardar
          </Button>

          <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="success">
            Usuario CREADO exitosamente.
          </MuiAlert>
          </Snackbar>
          <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            El usuario indicado ya existe actualmente.
          </MuiAlert>
          </Snackbar>
          </Container>

     </div>
    );
  }
}

export default Usuarios;
