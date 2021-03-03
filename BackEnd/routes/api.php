<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//API PARA CLIENTES
Route::post('/guardarCliente', 'clienteDP@post'); //para utilizar en react
Route::get('/consultaClientesId/{id}', 'clienteDP@consultaId'); //para utilizar en react
Route::get('/consultaClientesNombre/{nombre}', 'clienteDP@consultaNombre');
Route::get('/consultaClientesApellido/{apellido}', 'clienteDP@consultaApellido');
Route::get('/consulta', 'clienteDP@consultaGeneral');
Route::put('/editarCliente/{id}','clienteDP@put');
Route::delete('/eliminarCliente/{id}','clienteDP@delete');

//API PARA HABITACIONES
Route::post('/guardarHabitacion', 'habitacionDP@postHabitacion'); //para utilizar en react
Route::get('/consultaCodigo/{codigo}', 'habitacionDP@consultaCodigo'); //para utilizar en react
Route::get('/consultaValor/{valor}', 'habitacionDP@consultaValor');
Route::get('/consultaDisponibilidad/{disponibilidad}', 'habitacionDP@consultaDisponibilidad');
Route::get('/consultaLimpieza/{limpieza}', 'habitacionDP@consultaLimpieza');
Route::get('/consultaHabitaciones', 'habitacionDP@consultaGeneralHabitacion');
Route::put('/editarHabitacion/{codigo}','habitacionDP@putHabitacion');
Route::delete('/eliminarHabitacion/{codigo}','habitacionDP@borrarHabitacion');
//Route::put('/guardar/{nombre}','controlador@update');

//API PARA ASIGNACIONES
Route::post('/guardarAsignacion', 'asignacionDP@postAsignacion');
Route::put('/editarDisponibilidad/{codigo}', 'asignacionDP@putHabitacionDisponibilidad');
Route::put('/editarDisponibilidadOK/{codigo}', 'asignacionDP@putHabitacionDisponibilidadOK');
Route::get('/kardex/{fechaEntrada}', 'asignacionDP@kardex');
Route::get('/consultaGeneralAsignacion', 'asignacionDP@consultaGeneralAsignacion');
Route::get('/consultaIdCliente/{idCliente}', 'asignacionDP@consultaIdCliente');
Route::get('/consultaIdHabitacion/{idHabitacion}', 'asignacionDP@consultaIdHabitacion');
Route::get('/consultaFechaEntrada/{fechaEntrada}', 'asignacionDP@consultaFechaEntrada');
Route::get('/consultaHoraEntrada/{horaEntrada}', 'asignacionDP@consultaHoraEntrada');
Route::delete('/borrarAsignacion/{id}', 'asignacionDP@borrarAsignacion');

//CheckOut
Route::get('/Consultacheckout/{id}', 'asignacionDP@consultaCheckOut');
Route::put('/HabitacionCheckOut/{codigo}', 'asignacionDP@putHabitacionCheckOut');
Route::put('/AsignacionCheckOut/{id}', 'asignacionDP@putAsignacionCheckOut');
Route::get('/consultaCheckOutId/{id}', 'asignacionDP@consultaCheckOutId');

//FACTURA
Route::post('/guardarFactura', 'facturaDP@postFactura');
Route::get('/consultaFacturas', 'facturaDP@consultaGeneralFactura');
Route::get('/kardexFacturas/{fechaEntrada}', 'facturaDP@kardexFacturas');
Route::put('/AnularFactura/{id}', 'facturaDP@anularFactura');
Route::get('/facturaIdCliente/{idCliente}', 'facturaDP@facturaIdCliente');
Route::get('/facturaId/{id}', 'facturaDP@facturaId');
Route::get('/facturaFechaEmision/{fechaEntrada}', 'facturaDP@kardexFacturas');
Route::get('/facturaEstado/{estado}', 'facturaDP@facturaEstado');

//RESERVAS
Route::post('/guardarReserva', 'reservaDP@postReserva');
Route::post('/reservas', 'reservaDP@reservacion');
Route::get('/consultaReservas/{idHabitacion}', 'reservaDP@consultaReservas');
Route::put('/confirmarReserva/{idReserva}', 'reservaDP@confirmarReserva');
Route::get('/consultaGeneralReservas', 'reservaDP@consultaGeneralReservas');
Route::delete('/deleteReserva/{id}', 'reservaDP@deleteReserva');
Route::get('/consultaIdClienteReserva/{idCliente}', 'reservaDP@consultaIdClienteReserva');
Route::get('/consultaIdHabitacionReserva/{idHabitacion}', 'reservaDP@consultaIdHabitacionReserva');
Route::get('/consultaFechaEntradaReserva/{fechaEntrada}', 'reservaDP@consultaFechaEntradaReserva');
Route::get('/consultaHoraEntradaReserva/{horaEntrada}', 'reservaDP@consultaHoraEntradaReserva');
Route::get('/kardexReservas/{fechaEntrada}', 'reservaDP@kardexReservas');
Route::post('/sendEmail', 'reservaDP@sendEmail');

//LOGIN
Route::post('/login', 'usuarioDP@verificar');

//USUARIOS
Route::get('/consultaUsuario/{usuario}', 'usuarioDP@consultaUsuario');
Route::post('/guardarUsuario', 'usuarioDP@postUsuario');
Route::get('/consultaUsuarioRol/{rol}', 'usuarioDP@consultaUsuarioRol');
Route::get('/consultaGeneralUsuarios', 'usuarioDP@consultaGeneralUsuarios');
Route::delete('/deleteUsuario/{id}', 'usuarioDP@deleteUsuario');
Route::put('/editarUsuario/{id}', 'usuarioDP@putUsuario');
