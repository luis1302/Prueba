import React, { Component } from 'react';
import Principal from './menuPrincipal';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HotelIcon from '@material-ui/icons/Hotel';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {DatePicker, TimePicker} from '@material-ui/pickers';
import abierto from '../images/abierto.png';
import cerrada from '../images/cerrada.png';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CardMedia from '@material-ui/core/CardMedia';
import EventIcon from '@material-ui/icons/Event';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
class Asignaciones extends Component {
      constructor() {
      super();
      this.state={
          idReserva:'',
          idClienteReserva:'',
          id: '',
          nombre: '',
          apellido: '',
          fechaEntrada: moment().format('YYYY-MM-DDTHH:mm'),
          fechaSalida: moment().format('YYYY-MM-DDTHH:mm'),
          horaEntrada: moment().format('YYYY-MM-DDTHH:mm'),
          horaSalida: moment().format('YYYY-MM-DDTHH:mm'),
          habitaciones:[],
          eventos:[],
          codigo:'',
          abono:'',
          descripcion:'',
          personas_habitacion:'',
          disponibilidad:'',
          idHabitacion:'',
          idCliente:'',
          limpieza:'',
          buscar: '',
          resultado: '',
          open:false,
          open2:false,
          open3:false,
          abrir:false,
          abonoReserva:'',
          personas_habitacionReserva:'',
          MostrarDialogoClientes: false,
          MostrarConfirmacion: false,
          color:'',
          contador: 0,
          contadorDisponibles: 0,
          contadorOcupadas: 0
      }

            this.abrirAlertTabla=this.abrirAlertTabla.bind(this);
            this.abrirAlertAbrir=this.abrirAlertAbrir.bind(this);
            this.abrirAlertConfirmar=this.abrirAlertConfirmar.bind(this);
            this.handleStartDateChange=this.handleStartDateChange.bind(this);
            this.handleStartHourChange=this.handleStartHourChange.bind(this);
            this.handleEndDateChange=this.handleEndDateChange.bind(this);
            this.handleEndHourChange=this.handleEndHourChange.bind(this);

    }

    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res=>{
            this.setState({habitaciones:res.data, contador:res.data.length});
            const contadorDisponibles = res.data.filter(habitacion => habitacion.disponibilidad === 'Si' && habitacion.limpieza === 'No Requiere').length;
            const contadorOcupadas = res.data.length - contadorDisponibles;
            this.setState({contadorDisponibles, contadorOcupadas });
          })
          .catch(function(error){
            console.log(error);
        });
      }

      validarCampos = () => {
        var resultado = true;
        if( this.state.personas_habitacion.length> 0 &&  this.state.abono.length> 0) {
          resultado = false;
        }
        return resultado;
      }
      validarCamposReserva = () => {
        var resultado = true;
        if( this.state.personas_habitacionReserva.length> 0 &&  this.state.abonoReserva.length> 0) {
          resultado = false;
        }
        return resultado;
      }

      isNumber(number) {
        const re = /^[0-9]*$/;
        return re.test(String(number));
      }

      isFloat(number){
        const re=/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        return re.test(String(number));
      }

      cerrar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false});
        this.setState({open2:false});
        this.setState({open3:false});
        this.setState({abrir:false});
      };

    handleSubmit = event => {
      axios.get('http://localhost:8000/api/consultaHabitaciones').then(res=>{
           this.setState({habitaciones:res.data});
             console.log(this.state.habitaciones);
         });
      }

    handleStartDateChange(date) {
      this.setState({fechaEntrada:moment(date).format('YYYY-MM-DDTHH:mm'), horaEntrada: moment(date).format('YYYY-MM-DDTHH:mm')});
    }

    handleEndDateChange(date) {
      this.setState({fechaSalida:moment(date).format('YYYY-MM-DD'), horaSalida: moment(date).format('YYYY-MM-DDTHH:mm')});
    }

    handleStartHourChange(time){
      var fechaInicio = new Date(this.state.fechaEntrada);
      fechaInicio.setTime(new Date(time).getTime());
      this.setState({horaEntrada:moment(fechaInicio).format('YYYY-MM-DDTHH:mm') });
    }

    handleEndHourChange(time){
      var fechaFin = new Date(this.state.fechaSalida);
      fechaFin.setTime(new Date(time).getTime());
      this.setState({horaSalida:moment(fechaFin).format('YYYY-MM-DDTHH:mm') });
    }

    handleClos = () => {
      this.setState({MostrarConfirmacion: false});
    };

    handleClose0 = () => {
      this.setState({MostrarDialogoClientes: false});
    };

    setId = eve => {
      this.setState({id:eve.target.value});
    }

    setIdHabitacion = eve => {
      this.setState({idHabitacion:eve.target.value});
    }

    setNombre = eve => {
      this.setState({nombre:eve.target.value});
    }

    setApellido = eve => {
      this.setState({apellido:eve.target.value});
    }

    setPersonas_habitacion = evt => {
      if( this.isNumber(evt.target.value) ) {
      this.setState({personas_habitacion:evt.target.value});
      }
    }

    setPersonas_habitacionReserva = evt => {
      if( this.isNumber(evt.target.value) ) {
      this.setState({personas_habitacionReserva:evt.target.value});
      }
    }

    setTipo = eve => {
      this.setState({tipo:eve.target.value});
    }

    setAbono=eve=>{
      if( this.isFloat(eve.target.value) ) {
      this.setState({abono:eve.target.value});
      }
    }

    setAbonoReserva=eve=>{
      if( this.isFloat(eve.target.value) ) {
      this.setState({abonoReserva:eve.target.value});
      }
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

    buscarasignacionesHabitacion = (event, habitacion) => {
        this.setState({idHabitacion:habitacion.codigo,  MostrarDialogoClientes: true});
        const busqueda =  habitacion.codigo;
        var id='';
        var cliente='';
        axios.get("http://localhost:8000/api/consultaReservas/" + busqueda).then(res=>{
          let reservas = res.data;
          console.log('resrvas: ', reservas);
          if(reservas.length>0){
          for(let i=0; i<reservas.length;i++){
            reservas[i].start = moment(reservas[i].fechaEntrada).toDate();
            reservas[i].end = moment(reservas[i].fechaSalida).set('minute', 10);
            console.log('fechaSalida', reservas[i].end)
            reservas[i].title = ('Cliente:' + reservas[i].idCliente);
            id= reservas[i].id;
            cliente=reservas[i].idCliente;
          }

        this.setState({eventos:reservas, idReserva:id, idClienteReserva:cliente});
      }
      else{
        this.abrirAlertAbrir();
      }
      });
    }


    confirmarReserva = () => {

      axios.put('http://localhost:8000/api/confirmarReserva/'+this.state.idReserva, {
            estado: 'activo',
            personas_habitacion:this.state.personas_habitacionReserva,
            abono:this.state.abonoReserva,
            horaEntrada:this.state.horaEntrada
        }).then(res=>{
          axios.put('http://localhost:8000/api/editarDisponibilidad/'+this.state.idHabitacion, {
            }).then(res=>{
                axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res=>{
                    this.setState({habitaciones:res.data, contador:res.data.length});
                    const contadorDisponibles = res.data.filter(habitacion => habitacion.disponibilidad === 'Si' && habitacion.limpieza === 'No Requiere').length;
                    const contadorOcupadas = res.data.length - contadorDisponibles;

                    this.setState({contadorDisponibles, contadorOcupadas, eventos:[],abonoReserva:'',personas_habitacion:'',MostrarConfirmacion:false, MostrarDialogoClientes:false});
                  })
              })
            .catch(function (error) {
                console.log(error);
            })
          });
            this.abrirAlertConfirmar();
    }

    guardarAsignacion = () =>  {
      const busqueda=this.state.idHabitacion;
      const estado='activo';
      axios.post('http://127.0.0.1:8000/api/guardarAsignacion',{
        idHabitacion: busqueda,
        idCliente: this.state.id,
        personas_habitacion: this.state.personas_habitacion,
        estado: estado,
        abono:this.state.abono,
        fechaEntrada: this.state.fechaEntrada,
        horaEntrada: this.state.horaEntrada,
        fechaSalida: this.state.fechaSalida,
        horaSalida: this.state.horaSalida
      })
      .then(res=>{
        axios.put('http://localhost:8000/api/editarDisponibilidad/'+busqueda, {
          })
        .then(res=>{
          axios.get('http://127.0.0.1:8000/api/consultaHabitaciones').then(res=>{
              this.setState({habitaciones:res.data, contador:res.data.length});
              const contadorDisponibles = res.data.filter(habitacion => habitacion.disponibilidad === 'Si' && habitacion.limpieza === 'No Requiere').length;
              const contadorOcupadas = res.data.length - contadorDisponibles;

              this.setState({contadorDisponibles, contadorOcupadas, mostrarTitulo:false,mostrarText:false,personas_habitacion:'',buscar:'',abono:'',MostrarDialogoClientes:false});
            })
        })
    })
            .catch(function (error) {
                console.log(error);
            });
            this.abrirAlert();
    }

    obtenerClienteSeleccionado(id, posicion) {
      const clienteSelecionado=this.state.clientes[posicion];
      this.setState({
        id: clienteSelecionado.id,
        nombre: clienteSelecionado.nombre,
        apellido: clienteSelecionado.apellido
      });
      this.setState({MostrarDialogoClientes: true});
    }

    handleChange = event => {
        this.setState({ buscar: event.target.value});
    }

    abrirAlert(){
      this.setState({open:true});
    }

    abrirAlertTabla(){
      this.setState({open2:true});
    }

    abrirAlertConfirmar(){
      this.setState({open3:true});
    }

    abrirAlertAbrir(){
      this.setState({abrir:true});
    }

    busquedaParametros = event => {
      const busqueda =  this.state.buscar;
      axios.get("http://localhost:8000/api/consultaClientesId/" + busqueda).then(rest => {
        const clientes = rest.data;
        if(clientes.length > 0){
        this.setState({
          id: clientes[0].id,
          nombre: clientes[0].nombre,
          apellido: clientes[0].apellido,
          mostrarText: true,
          mostrarTitulo: true
        });
        }
        else{
          this.abrirAlertTabla();
        }
      });
    }

  render() {
    return (
          <div>
          <Principal />
          <h2 style={{fontStyle: 'italic', marginLeft: 50}}><CheckBoxIcon/> Seleccione la Habitacion a Entregar</h2>
          <Grid container spacing={10}>
          <Grid item xs={3}>
          <Card style={{marginLeft:50, backgroundColor: '#ffcc80'}}>
                <CardContent>
                  <Typography variant="paragraph" style={{color:"#bf360c", fontStyle: 'bold', fontSize:18}}>
                    <HotelIcon style={{marginRight:5}}/>Total de Habitaciones:
                  </Typography>
                    <Typography variant="paragraph" style={{color:"black", fontSize:20, marginLeft:10}}>
                      {this.state.contador}
                    </Typography>
                </CardContent>
          </Card>
          </Grid>

          <Grid item xs={3}>
          <Card style={{backgroundColor: '#ffcc80'}}>
                <CardContent>
                  <Typography variant="paragraph" style={{color:"#bf360c", fontStyle: 'bold', fontSize:18}}>
                    <PersonAddIcon style={{marginRight:5}}/>Habitaciones Disponibles:
                  </Typography>
                    <Typography variant="paragraph" style={{color:"black", fontSize:20, marginLeft:10}}>
                      {this.state.contadorDisponibles}
                    </Typography>
                </CardContent>
          </Card>
          </Grid>

          <Grid item xs={3.5}>
          <Card style={{backgroundColor: '#ffcc80'}}>
                <CardContent>
                  <Typography variant="paragraph" style={{color:"#bf360c", fontStyle: 'bold', fontSize:18}}>
                    <PersonAddDisabledIcon style={{marginRight:1}}/>Habitaciones NO Disponibles  :
                  </Typography>
                    <Typography variant="paragraph" style={{color:"black", fontSize:20, marginLeft:10}}>
                      {this.state.contadorOcupadas}
                    </Typography>
                </CardContent>
          </Card>
          </Grid>
          </Grid>
          <br></br>

          <Grid container >
            <Grid item style={{marginLeft:50}}>
            <Avatar variant="square" style={{backgroundColor:'#f57f17', width:15,height:15}}>
            </Avatar>
            </Grid>

            <Grid item>
            <Typography variant="paragraph" style={{color:"#01579b", fontSize:12, marginLeft:5}}>
              Habitaciones NO Disponibles
            </Typography>
            </Grid>

            <Grid item style={{marginLeft:50}}>
            <Avatar variant="square" style={{backgroundColor:'#fdd835', width:15,height:15}}>
            </Avatar>
            </Grid>

            <Grid item>
            <Typography variant="paragraph" style={{color:"#01579b", fontSize:12, marginLeft:5}}>
              Habitaciones Disponibles
            </Typography>
            </Grid>
          </Grid>

          {this.state.habitaciones.map((habitacion, key)=> <Grid item xs={5} style={{display: 'inline-block', marginTop: 30,marginLeft:30}}>
          <Card style={{marginRight:25, height:427, width:245.2, backgroundColor: habitacion.disponibilidad === 'Si' && habitacion.limpieza === 'No Requiere' ? '#fdd835' : '#f57f17'}}>
                <CardMedia
                  component="img"
                  alt="disponibilidad"
                  height="155"
                  widht='210'
                  image={habitacion.disponibilidad==='Si' && habitacion.limpieza === 'No Requiere' ? abierto : cerrada}
                  title="Check Out"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" style={{color: 'black', fontStyle: 'bold'}}>
                    {habitacion.codigo}
                  </Typography>
                  <br></br>
                  <Typography variant="paragraph" style={{color:"black", fontStyle: 'bold'}}>
                    Descripcion:
                  </Typography>
                    <Typography variant="paragraph" style={{color:"#a74b00"}}>
                    {habitacion.descripcion}
                    </Typography>
                    <br></br>
                    <Typography variant="title" style={{color: 'black', fontStyle: 'bold'}}>
                    Disponible:
                    </Typography>
                    <Typography variant="paragraph" style={{color:"#a74b00"}}>
                      {habitacion.disponibilidad}
                    </Typography>
                    <br></br>
                    <Typography variant="title" style={{color: 'black', fontStyle: 'bold'}}>
                    Requiere Limpieza:
                    </Typography>
                    <Typography variant="paragraph" style={{color:"#a74b00"}}>
                      {habitacion.limpieza}
                    </Typography>
                    <br></br>
                    <Typography variant="title" style={{color: 'black', fontStyle: 'bold'}}>
                    Maximo de Personas:
                    </Typography>
                    <Typography variant="paragraph" style={{color:"#a74b00"}}>
                      {habitacion.numero_personas}
                    </Typography>
                </CardContent>
                <CardActions>
                { habitacion.disponibilidad === 'Si' && habitacion.limpieza === 'No Requiere' ?
                <Button onClick={(e) => {this.buscarasignacionesHabitacion(e, habitacion); }}
                          size="small">
                          Asignar
                </Button> :''}
                </CardActions>
          </Card>
          </Grid>)}

          <Dialog
          open={this.state.MostrarConfirmacion}
          onClose={this.handleClos}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">Desea confirmar el ingreso del cliente?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{fontSize:14, fontWeight:700}}>
              {this.state.idHabitacion}
              <br></br>
              Identificacion del Cliente: {this.state.idClienteReserva}
            </DialogContentText>
            <TextField
            fullWidth
              label="Nº Personas en la habitacion"
              value={this.state.personas_habitacionReserva}
              onChange={this.setPersonas_habitacionReserva}
              margin="normal"
              type="text" name="id"
            />
            <TextField
            fullWidth
              label="Cantidad abonada"
              value={this.state.abonoReserva}
              onChange={this.setAbonoReserva}
              margin="normal"
              type="text" name="id"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClos} color="primary">
              Cerrar
            </Button>
            <Button disabled={this.validarCamposReserva()} onClick={this.confirmarReserva} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

          <Dialog open={this.state.MostrarDialogoClientes} onClose={this.handleClose0} aria-labelledby="form-dialog-title" maxWidth='md'>
                  <DialogContent maxWidth='md'>
                  <DialogTitle id="form-dialog-title" style={{ marginLeft:-20,color:"#bf360c" }}><EventIcon/>Reservas {this.state.idHabitacion}</DialogTitle>
                  <Calendar
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  views={['month', 'day', 'week']}
                  events={this.state.eventos}
                  style={{height: "70vh" }}
                  onSelectEvent={(event: Object, e: SyntheticEvent) => this.setState({MostrarConfirmacion:true})}
                  />
                  <DialogTitle id="form-dialog-title" style={{marginLeft:-20,color:"#bf360c" }}><EditIcon/>Seleccionar Cliente</DialogTitle>

                    <DialogContentText>
                      Seleccione el cliente que desee
                    </DialogContentText>
                    <Grid container spacing={3}>
                    <Grid item xs ={7}>
                      <TextField
                        fullWidth
                        label="Ingrese la cedula del cliente"
                        value={this.state.buscar}
                        onChange={this.handleChange}
                        margin="normal"
                        style={{marginLeft:20}}
                        type="text" name="id"
                      />
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid item xs={3}>
                    <Button style={{marginTop:20, marginLeft:20}} variant="contained" type="submit" onClick={this.busquedaParametros}>
                    <SearchIcon/>
                      Consultar
                    </Button>
                    </Grid>
                    </Grid>

                    { this.state.mostrarTitulo ?
                    <h3 style={{textAlign:'center'}}> Datos del Cliente </h3>: ''}

                    { this.state.mostrarText ?
                    <Grid container spacing={3}>
                    <Grid item xs={12} style={{textAlign:'center'}}>
                    <TextField
                      fullWidth
                      label="Cedula o Pasaporte"
                      value={this.state.id}
                      onChange={this.setId}
                      margin="normal"
                      type="text" name="id"
                      disabled
                    />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Nombre"
                        value={this.state.nombre}
                        onChange={this.setNombre}
                        margin="normal"
                        type="text" name="id"
                        disabled
                      />
                      </Grid>
                      <Grid item xs={6}>
                      <TextField
                        label="Apellido"
                        value={this.state.apellido}
                        onChange={this.setApellido}
                        margin="normal"
                        type="text" name="id"
                        disabled
                      />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField
                      fullWidth
                        label="Nº Personas en la habitacion"
                        value={this.state.personas_habitacion}
                        onChange={this.setPersonas_habitacion}
                        margin="normal"
                        type="text" name="id"
                      />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField
                      fullWidth
                        label="Cantidad abonada"
                        value={this.state.abono}
                        onChange={this.setAbono}
                        margin="normal"
                        type="text" name="id"
                      />
                      </Grid>

                    <Grid item xs={6}>
                      <DatePicker
                        value={this.state.fechaEntrada}
                        disablePast={true}
                        onChange={(e) => { this.handleStartDateChange(e); }}
                        label="Fecha de Entrada"
                        format="YYYY-MM-DD"
                      />
                      </Grid>
                      <Grid item xs={6}>
                      <TimePicker
                        value={this.state.horaEntrada}
                        onChange={(e) => { this.handleStartHourChange(e); }}
                        label="Hora de Entrada"
                      />
                      </Grid>

                      <Grid item xs={6}>
                        <DatePicker
                          value={this.state.fechaSalida}
                          onChange={(e) => { this.handleEndDateChange(e); }}
                          label="Fecha de Salida"
                          format="YYYY-MM-DD"
                          minDate={this.state.fechaEntrada}
                          minDateMessage={"La fecha de salida no puede ser menor a la fecha de inicio"}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TimePicker
                          value={this.state.horaSalida}
                          onChange={(e) => { this.handleEndHourChange(e); }}
                          label="Hora de Salida"
                          format="hh:mm A"
                        />
                        </Grid>
                      </Grid>  : '' }

                  <Snackbar open={this.state.open2} autoHideDuration={1500} onClose={this.cerrar}>
                  <MuiAlert  onClose={this.cerrar} severity="error">
                    No existen datos con la informacion indicada.
                  </MuiAlert>
                  </Snackbar>

                  <Snackbar open={this.state.abrir} autoHideDuration={1500} onClose={this.cerrar}>
                  <MuiAlert  onClose={this.cerrar} severity="error">
                    No existen reservas para esta habitacion.
                  </MuiAlert>
                  </Snackbar>

                  <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.cerrar}>
                  <MuiAlert  onClose={this.cerrar} severity="success">
                    Habitacion asignada correctamente.
                  </MuiAlert>
                  </Snackbar>

                  <Snackbar open={this.state.open3} autoHideDuration={1500} onClose={this.cerrar}>
                  <MuiAlert  onClose={this.cerrar} severity="success">
                    Reserva confirmada.
                  </MuiAlert>
                  </Snackbar>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={()=>{this.setState({mostrarTitulo:false,mostrarText:false,personas_habitacion:'',buscar:'',abono:'',MostrarDialogoClientes:false})}} color="primary">
                      Cerrar
                    </Button>
                    <Button disabled={this.validarCampos()} onClick={this.guardarAsignacion} color="primary">
                      Guardar
                    </Button>
                    </DialogActions>
            </Dialog>
     </div>
    );
  }
}

export default Asignaciones;
