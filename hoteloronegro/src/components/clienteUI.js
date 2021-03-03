import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';

class Cliente extends Component {
      constructor() {
      super();
      this.state={
          clientes:[],
          id:'',
          nombre:'',
          apellido:'',
          direccion:'',
          telefono:'',
          correo:'',
          consulta:'id',
          buscar: '',
          open:false,
          open2:false,
          mostrarEdit: false
      }
      this.ingresar = this.ingresar.bind(this);
      this.isEmail = this.isEmail.bind(this);
      this.isText = this.isText.bind(this);
      this.isPhone = this.isPhone.bind(this);
      this.setNombre = this.setNombre.bind(this);
      this.validarCampos = this.validarCampos.bind(this);
      this.setId=this.setId.bind(this);
      this.setApellido=this.setApellido.bind(this);
      this.setDireccion=this.setDireccion.bind(this);
      this.setTelefono=this.setTelefono.bind(this);
      this.setCorreo=this.setCorreo.bind(this);
      this.abrirAlert=this.abrirAlert.bind(this);
    }

    isText(text) {
      const re = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/;
      console.log('ES TEXTO ?: ', re.test(String(text)));
      return re.test(String(text));
    }

    isEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    isPhone(phone) {
      const re = /^\d*$/;
      return re.test(String(phone));
    }

    setId(evt){
      this.setState({id:evt.target.value});
      console.log(this.state.id);
    }

    setNombre=(evt)=>{
      if(this.isText(evt.target.value) ) {
        this.setState({nombre:evt.target.value});
      }
    }

    setApellido(evt){
      if( this.isText(evt.target.value) ) {
      this.setState({apellido:evt.target.value});
      }
    }

    setDireccion(evt){
      this.setState({direccion:evt.target.value});
      console.log(this.state.direccion);
    }

    setTelefono(evt){
      if(this.isPhone(evt.target.value) ){
          this.setState({telefono:evt.target.value});
      }
    }

    setCorreo(evt){
      this.setState({correo:evt.target.value});
      console.log(this.state.correo);
    }

    validarCampos = () => {
      var resultado = true;
      if( this.state.correo.length> 0 && this.isEmail(this.state.correo) && this.state.nombre.length> 0
          && this.state.apellido.length> 0 && this.state.direccion.length> 0 && this.state.telefono.length> 0) {
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
        const busqueda =  this.state.id;

        axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
          const clientes = rest.data;
          this.setState({clientes});

          if(clientes.length > 0){
            this.abrirAlert2();
          }
          else{
            axios.post('http://localhost:8000/api/guardarCliente', {
                  id: this.state.id,
                  nombre: this.state.nombre,
                  apellido: this.state.apellido,
                  direccion: this.state.direccion,
                  telefono: this.state.telefono,
                  correo: this.state.correo

              })
              .then(res=>{
                this.setState({id:'',nombre:'',apellido:'',direccion:'',telefono:'',correo:''});
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
          <Grid style={{marginTop: 40, marginLeft:40}} container>
            <Grid>
            <PersonAddIcon style={{fontSize: 50, color:"#bf360c" }}/>
            </Grid>
            <Grid>
            <h3 style={{color:"#bf360c" }}>
            Ingresar Cliente
            </h3>
            </Grid>
          </Grid>

          <Grid container spacing={9}>
            <Grid>
          <h4 className="hola">Nota:</h4>
          </Grid>
          <Grid>
          <h4> Todos los campos deben estar llenos.</h4>
          </Grid>
          </Grid>

          <Box align="center" width="60%" borderRadius={16} boxShadow={3} borderColor="#ff9800"
              color="text.primary" m={3} border={3} fontStyle="Italic">

          <Grid container spacing={10}>
          <Grid item>
          <TextField
          style={{marginTop: 20, marginLeft:20}}
          id="id"
          name="id"
          label="Cedula o Pasaporte"
          margin="normal"
          value={this.state.id}
          onChange={this.setId}
          />
          </Grid>
          <Grid item>
          <TextField
          style={{marginTop: 20}}
          id="nombre"
          name="nombre"
          label="Nombre"
          margin="normal"
          value={this.state.nombre}
          onChange={this.setNombre}
          />
          </Grid>
          <Grid item>
          <TextField
          style={{marginTop: 20}}
          id="apellido"
          name="apellido"
          label="Apellido"
          margin="normal"
          value={this.state.apellido}
          onChange={this.setApellido}
          />
          </Grid>
          </Grid>
          <Grid container spacing={10}>
          <Grid item>
          <TextField
          style={{marginTop: 20, marginLeft:20}}
          id="direccion"
          name="direccion"
          label="Direccion"
          margin="normal"
          value={this.state.direccion}
          onChange={this.setDireccion}
          />
          </Grid>
          <Grid item>
          <TextField
          style={{marginTop: 20}}
          id="telefono"
          name="telefono"
          label="Telefono"
          margin="normal"
          value={this.state.telefono}
          onChange={this.setTelefono}
          />
          </Grid>
          <Grid item>
          <TextField
          style={{marginTop: 20}}
          id="correo"
          name="correo"
          label="Correo Electronico"
          helperText="Ej: correo@direccion.com"
          margin="normal"
          value={this.state.correo}
          onChange={this.setCorreo}
          />
          </Grid>
          </Grid>

          <Button
            onClick = {this.ingresar}
            style={{marginTop: 20, marginBottom:20}}
            variant="contained" type="submit"
            disabled={this.validarCampos()}
          >
              <SaveIcon/>
              Guardar
          </Button>

          <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="success">
            Cliente GUARDADO exitosamente.
          </MuiAlert>
          </Snackbar>
          <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            La CEDULA O PASAPORTE indicada ya existe actualmente.
          </MuiAlert>
          </Snackbar>
          </Box>

     </div>
    );
  }
}

export default Cliente;
