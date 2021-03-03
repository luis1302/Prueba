import React, { Component } from 'react';
import Principal from './menuPrincipal';
import '../App.css'
import axios from 'axios';
import {Link} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import {DatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import logo from '../images/LogoHotel3.svg';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import check from '../images/reserva.svg';
import moment from 'moment';

class Reservas extends Component {
      constructor() {
      super();
      this.state={
        habitaciones:[],
        habitacionSeleccionada: { llegarTarde: false},
        buscar:'',
        open2:false,
        open:false,
        mostrarComprobante:false,
        mostrarDialogo:false,
        mostrarDialogoEntrada:false,
        idHabitacion:'',
        personas_habitacion:'',
        nombre:'',
        apellido:'',
        correo:'',
        fechaEntrada:moment().format('YYYY-MM-DD'),
        fechaSalida:moment().format('YYYY-MM-DD'),
        habitacionesReserva:[],
        contadorDias:0

        }
       }

       handleCloseComprobante = () => {
         this.setState({mostrarComprobante: false});
       };

       handleClose0 = () => {
         this.setState({mostrarDialogo: false});
       };

       handleCloseEntrada = () => {
         this.setState({mostrarDialogoEntrada: false});
       };

       setNombre = eve => {
         this.setState({nombre:eve.target.value});
       }

       setApellido = eve => {
         this.setState({apellido:eve.target.value});
        }

        setCorreo = eve => {
          this.setState({correo:eve.target.value});
         }

      setBuscar = eve => {
           this.setState({buscar:eve.target.value});
        }

       busquedaDisponibles = event => {
         axios.post('http://127.0.0.1:8000/api/reservas',{
           fechaEntrada: this.state.fechaEntrada,
           fechaSalida: this.state.fechaSalida
         }).then(res=>{
           const habitaciones = res.data;
           if(habitaciones.length > 0){
           this.setState({habitaciones,mostrarText:true,mostrarFinalizar:true});
           }
           else{
             this.abrirAlertTabla();
           }
         });
       }

       enviarCorreo = event => {
         axios.post('http://127.0.0.1:8000/api/sendEmail',{
           nombre: this.state.nombre,
           apellido: this.state.apellido,
           fechaEntrada: this.state.fechaEntrada,
           fechaSalida: this.state.fechaSalida,
           correo: this.state.correo
         }).then(res=>{
           this.setState({open3:true,habitaciones:[],buscar:'',mostrarInf:false, mostrarText:false,mostrarBoton:false, mostrarComprobante:false,mostrarFinalizar:false});
         })
       }

       validarCampos = () => {
         var resultado = true;
         if( this.state.buscar.length> 0) {
           resultado = false;
         }
         return resultado;
       }

       busquedaCliente = event =>{
           const busqueda=this.state.buscar;
           if(this.state.buscar.length > 0){
             axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
               const clientes = rest.data;
               if(clientes.length > 0){
                 this.setState({
                   mostrarInf: true,
                   mostrarBoton:false,
                   idCli: clientes[0].id,
                   nombre: clientes[0].nombre,
                   apellido: clientes[0].apellido,
                   correo: clientes[0].correo
                 });
               }
               else{
                 this.abrirAlertCliente();
                 this.setState({
                   mostrarInf:false,
                   mostrarBoton:true,
                   nombre: '',
                   apellido: ''
                 });
               }
             });
           }
         }

        reserva = (reserva) =>{
          const busqueda=this.state.idHabitacion;
          const fecha2=new Date(this.state.fechaSalida);
          const fecha1=new Date(this.state.fechaEntrada);
          const habitacionesNuevas=[];

          this.state.habitaciones.forEach((hab) => {
            if(hab.codigo != busqueda) {
              habitacionesNuevas.push(hab);
            } else {
              console.log('excluida: ', hab);
            }
          });
          this.setState({habitaciones: habitacionesNuevas, mostrarDialogo:false });

          var contadorDias= (fecha2.getTime() - fecha1.getTime()) / (1000 * 3600 * 24);
          if (contadorDias === 0 ) {contadorDias = 1; }
          var reservaNueva = this.state.habitacionesReserva;
          const habitacionSelecionada = this.state.habitaciones.filter(asign => asign.codigo === busqueda)[0];
          axios.post('http://127.0.0.1:8000/api/guardarReserva',{
            idHabitacion: busqueda,
            idCliente: this.state.buscar,
            personas_habitacion: this.state.personas_habitacion,
            estado: 'Reserva',
            abono:0,
            fechaEntrada: this.state.fechaEntrada,
            horaEntrada: '12:00',
            fechaSalida: this.state.fechaSalida,
            horaSalida: '08:00'
          })
          .then(res=>{
            axios.get("http://localhost:8000/api/consultaCodigo/" + habitacionSelecionada.idHabitacion).then(rest => {
            const habitaciones = rest.data[0];
            habitacionSelecionada.habitacion=habitaciones;
            reservaNueva.push(habitacionSelecionada);
            this.setState({habitacionesReserva: reservaNueva, contadorDias});
          })
          this.abrirAlertReserva();
        });

      }

     abrirAlertCliente(){
       this.setState({open:true});
     }

     abrirAlertReserva(){
       this.setState({open1:true});
     }

      abrirAlertTabla(){
        this.setState({open2:true});
      }

      cerrar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false});
        this.setState({open1:false});
        this.setState({open2:false});
        this.setState({open3:false});
      };

      cerrarDialogos=(event,reason)=>{
        if (reason === 'clickaway') {
          return;
        }
        this.setState({mostrarDialogo:false});
        this.setState({mostrarComprobante:false});
          this.setState({mostrarDialogoEntrada:false});
      }

       handleStartDateChange(date) {
         this.setState({fechaEntrada:moment(date).format('YYYY-MM-DD')});
       }

       handleEndDateChange(date) {
         this.setState({fechaSalida:moment(date).format('YYYY-MM-DD')});
       }

  render() {
    return (
          <div>
          <Principal />
          <h2 style={{fontStyle: 'italic', marginLeft: 50}}> <PersonAddIcon/>RESERVAS</h2>
          <h2 style={{fontStyle: 'italic', textAlign:'center',marginLeft: 50}}>Seleccione las fechas para la reserva</h2>
          <br></br>
          <Grid container spacing={1}>
          <Grid item xs = {5}>
          <TextField
            style={{marginLeft:50}}
            variant="outlined"
            label="Id para la reserva"
            value={this.state.buscar}
            onChange={this.setBuscar}
            onBlur={(e) => {this.busquedaCliente(e);}}
            margin="normal"
            type="text" name="id"
          />
          {this.state.mostrarBoton ?
          <Button style={{marginTop:20,marginLeft: 50, color:'white', backgroundColor:'#bf360c'}} autoFocus><Link style={{color:'white',textDecoration:'none'}} to='/cliente'>
            Ingresar
          </Link>
          </Button>:'' }
          </Grid>
          { this.state.mostrarInf ?
          <Grid item xs ={7} style={{marginLeft:-230}}>
          <TextField
            variant="outlined"
            label="Nombre"
            value={this.state.nombre}
            onChange={this.setNombre}
            margin="normal"
            type="text" name="id"
          />
          <TextField
            style={{marginLeft:50}}
            variant="outlined"
            label="Apellido"
            value={this.state.apellido}
            onChange={this.setApellido}
            margin="normal"
            type="text" name="id"
          />
          <TextField
            style={{marginLeft:50}}
            variant="outlined"
            label="Correo Electronico"
            value={this.state.correo}
            onChange={this.setCorreo}
            margin="normal"
            type="text" name="id"
          /></Grid>: ''
        }
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={8}>
          <Grid item xs={5} style={{marginLeft: 50}}>
          <Typography style={{marginLeft:100, fontSize:22, fontStyle: 'italic', fontWeight:900}}>Fecha de Entrada</Typography>
          <br></br>
          <DatePicker
            variant='static'
            orientation="landscape"
            value={this.state.fechaEntrada}
            disablePast={true}
            onChange={(e) => { this.handleStartDateChange(e); }}
            label="Fecha de Entrada"
            format="YYYY-MM-DD"
          />
          </Grid>
          <Grid item xs={5}>
          <Typography style={{marginLeft:100, fontSize:22, fontStyle: 'italic', fontWeight:900}}>Fecha de Salida</Typography>
          <br></br>
          <DatePicker
            variant='static'
            orientation="landscape"
            value={this.state.fechaSalida}
            disablePast={true}
            onChange={(e) => { this.handleEndDateChange(e); }}
            label="Fecha de Salida"
            format="YYYY-MM-DD"
            minDate={this.state.fechaEntrada}
            minDateMessage={"La fecha de salida no puede ser menor a la fecha de inicio"}
          />
          </Grid>
          </Grid>
          <br></br>
          <Button  onClick={this.busquedaDisponibles} style={{marginLeft: 50, color:'white', backgroundColor: this.validarCampos()==false ? '#bf360c' : 'white'}}  disabled={this.validarCampos()} autoFocus>
            Consultar
          </Button>
          <br></br><br></br>
            { this.state.mostrarText ?
            <Typography style={{marginLeft:100, fontSize:22, fontStyle: 'italic', fontWeight:900}}>Habitaciones Disponibles</Typography>: ''
          }
              {this.state.habitaciones.map((habitacion, key)=> <Grid item xs={5} style={{display: 'inline-block', marginTop: 30,marginLeft:30}}>
              <Card style={{marginRight:25, height:427, width:245.2}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Check"
                    height="155"
                    widht='210'
                    image={check}
                    title="Reservas"
                  />
                <CardContent>
                  <Typography style={{color:'#e65100', fontWeight:400}} gutterBottom variant="h5" component="h2">
                  {habitacion.codigo}
                  </Typography>
                  <Typography style={{color:'#b71c1c', fontWeight:700}} variant="body1" color="textSecondary" component="p">
                    Precio:
                  </Typography>
                  <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                  ${habitacion.valor}
                  </Typography>
                  <Typography style={{color:'#b71c1c', fontWeight:700}} variant="body1" color="textSecondary" component="p">
                    Maximo de Personas:
                  </Typography>
                  <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                  {habitacion.numero_personas}
                  </Typography>
                  <Typography style={{color:'#b71c1c', fontWeight:700}} variant="body1" color="textSecondary" component="p">
                    Descripcion:
                  </Typography>
                  <Typography style={{color:'black'}} variant="body2" color="textSecondary" component="p">
                  {habitacion.descripcion}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              <Button  onClick={() => {this.setState({idHabitacion:habitacion.codigo, personas_habitacion:habitacion.numero_personas, habitacionSeleccionada: habitacion, mostrarDialogo:true})}} size="small" color="primary">
                Reservar
              </Button>
          </CardActions>
          </Card>
          </Grid>)}
          <br></br>
          <br></br>
          { this.state.mostrarFinalizar ?
          <Button  onClick={()=>this.setState({mostrarComprobante:true})} style={{marginLeft: 50, color:'white', backgroundColor:'#bf360c'}} autoFocus>
            Finalizar Reserva
          </Button>: ''
        }

            <Dialog
              open={this.state.mostrarDialogo}
              onClose={this.handleClose0}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            {this.state.habitacionSeleccionada.llegarTarde?
              <DialogTitle id="alert-dialog-title"> Al reservar esta Habitacion, La hora de llegada minima es partir de las 13:00 <br></br><br></br>Desea reserva esta habitacion?</DialogTitle>
              : <DialogTitle id="alert-dialog-title">  Desea reserva esta habitacion?</DialogTitle>
            }

              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.idHabitacion}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.cerrarDialogos} color="primary">
                  Cancelar
                </Button>
                <Button onClick={this.reserva} color="primary" autoFocus>
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>

          <Dialog
              fullScreen
              open={this.state.mostrarComprobante}
              onClose={this.handleCloseComprobante}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >

            <AppBar>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={this.handleCloseComprobante} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" >
                    Cerrar
                  </Typography>
                </Toolbar>
              </AppBar>

              <DialogTitle style={{marginTop:50, textAlign:'center'}} id="alert-dialog-title">Comprobante de Reserva</DialogTitle>
              <Box align="center" width="45%" boxShadow={3} borderColor="#3f51b5" bgcolor="background.paper"
                  color="text.primary" p={2} mx='auto' border={3}>
              <DialogContent>
                <Grid container>
                <Grid item xs={6}>
                <img style={{marginTop:40}} src={logo} height="60" alt="imgLogo"/>
                </Grid>
                <Grid item xs={6}>
                <Typography style={{fontSize:25, fontWeight:900,textAlign:'right'}}>HOTEL</Typography>
                <Typography style={{fontSize:25, fontStyle: 'italic', textAlign:'right',fontWeight:900}}>"ORO NEGRO"</Typography>
                <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Dir. Av. Quito 262 y</Typography>
                <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Pasaje Gonzanama</Typography>
                <Typography style={{fontSize:12, fontWeight:700, textAlign:'right'}}>Telf. 062-830-174</Typography>
                <Typography style={{fontSize:12, textAlign:'right'}}>LAGO AGRIO - SUCUMBIOS - ECUADOR</Typography>
                </Grid>
                </Grid>
                <br></br>

                <Grid>
                <Box align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
                    color="text.primary" p={1} mx='auto' border={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Typography style={{fontSize:12, marginTop:5,textAlign:'left', fontWeight:700}}>Nombre:</Typography>
                      </Grid>
                      <Grid item xs={3}>
                      <InputBase
                      box-sizing='border-box'
                      margin='none'
                        value={this.state.nombre} onChange={this.setNombre}
                        style={{marginLeft:-200,font:'small-caption', color:'black'
                    }}
                       inputProps={{ 'aria-label': 'naked' }}
                     />
                     </Grid>
                     <Grid item xs={3}>
                    <Typography style={{fontSize:12, marginTop:5,textAlign:'left', fontWeight:700}}>Apellido:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                     <InputBase
                     box-sizing='border-box'
                       value={this.state.apellido} onChange={this.setApellido}
                       style={{ marginLeft:-200, font:'small-caption', color:'black',
                       margin:'none'}}
                      inputProps={{ 'aria-label': 'naked' }}
                    />
                      </Grid>
                      </Grid>
                </Box>

                <Box borderTop={0} align="center" width="97.5%" borderColor="#3f51b5" bgcolor="background.paper"
                    color="text.primary" p={1} mx='auto' border={2}>
                    <Grid container spacing={1}>
                      <Grid item xs={0.5}>
                        <Typography style={{fontSize:12, textAlign:'left', marginTop:5,fontWeight:700}}>RUC</Typography>
                      </Grid>
                    <Grid item xs={6}>
                    <InputBase
                    box-sizing='border-box'
                      value={this.state.buscar} onChange={this.setBuscar}
                      style={{font:'small-caption',marginLeft:-150, color:'black'
                  }}
                     inputProps={{ 'aria-label': 'naked' }}
                   />
                    </Grid>
                  </Grid>
                </Box>
                </Grid>
                <br></br>
                <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
                    color="text.primary" mx='auto' border={2.5}>
                  <Grid container>
                    <Grid item xs={2}>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={2}>
                      <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>Cant. Dias</Typography>
                    </Box>
                    </Grid>

                  <Grid item xs={10}>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                      <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>DESCRIPCION</Typography>
                    </Box>
                  </Grid>
                </Grid>
                </Box>

                {this.state.habitacionesReserva.map((asignacion, key)=>
                <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
                    color="text.primary" mx='auto' borderTop={0} border={2.5}>
                  <Grid container>

                    <Grid item xs={2}>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                      <Typography style={{fontSize:12, textAlign:'center'}}>{this.state.contadorDias}</Typography>
                    </Box>
                    </Grid>

                  <Grid item xs={10}>
                    <Box widht='100%' borderColor="black" bgcolor="background.paper" borderRight={0}>
                      <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                      <Typography style={{fontSize:12, textAlign:'CENTER', fontWeight:700}}>{asignacion.codigo}</Typography>
                      </Box>
                      <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                      <Typography style={{fontSize:12, textAlign:'CENTER'}}>Fecha de Entrada: {this.state.fechaEntrada}</Typography>
                      </Box>
                      <Box widht='100%' borderColor="black" bgcolor="background.paper" borderLeft={2} style={{marginLeft:-2}}>
                        <Typography style={{fontSize:12, textAlign:'CENTER'}}>Fecha de Salida: {this.state.fechaSalida}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                </Box>)}

                <Box align="center" width="100%" borderColor="#3f51b5" bgcolor="background.paper"
                    color="text.primary" mx='auto' borderTop={0} border={2.5}>
                  <Grid container>
                    <Grid item xs={12}>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                      <Typography style={{fontSize:12, textAlign:'center', fontWeight:700}}>F. Autorizada</Typography>
                    </Box>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                    <br></br>
                    </Box>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                    <br></br>
                    </Box>
                    <Box widht='100%' borderColor="#3f51b5" bgcolor="background.paper" borderRight={0}>
                    <br></br>
                    </Box>
                    </Grid>

                </Grid>
                </Box>
                <Typography style={{fontSize:10, textAlign:'left'}}>COMPROBANTE DE RESERVA REALIZADA</Typography>
              </DialogContent>

              <DialogActions>
                <Button onClick={this.cerrarDialogos} color="primary">
                  Cancelar
                </Button>
                <Button onClick={this.enviarCorreo} color="primary" autoFocus>
                  Confirmar
                </Button>
              </DialogActions>
              </Box>
            </Dialog>

          <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            No existe el cliente indicado, primero ingreselo.
          </MuiAlert>
          </Snackbar>

          <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="error">
            No existen habitaciones disponibles.
          </MuiAlert>
          </Snackbar>

          <Snackbar open={this.state.open1} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="success">
            Reserva Ingresada Exitosamente.
          </MuiAlert>
          </Snackbar>

          <Snackbar open={this.state.open3} autoHideDuration={1500} onClose={this.cerrar}>
          <MuiAlert  onClose={this.cerrar} severity="success">
            Comprobante Generado Exitosamente.
          </MuiAlert>
          </Snackbar>
          </div>
    );
  }
}

export default Reservas;
