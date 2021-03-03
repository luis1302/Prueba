<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use App\habitacione;
use App\asignacion;
use DateTime;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;

class reservaDP extends Controller
{
    //

    public function postReserva(Request $request)
   {
        $registro = new asignacion();
        $registro->id=0;
        $registro->idHabitacion = $request->input('idHabitacion');
        $registro->idCliente = $request->input('idCliente');
        $registro->personas_habitacion = $request->input('personas_habitacion');
        $registro->estado = $request->input('estado');
        $registro->abono = $request->input('abono');
        $registro->fechaEntrada = $request->input('fechaEntrada');
        $registro->horaEntrada = $request->input('horaEntrada');
        $registro->fechaSalida = $request->input('fechaSalida');
        $registro->horaSalida = $request->input('horaSalida');
        $registro->save();
        return 'Exito';
  }

  public function consultaReservas($idHabitacion){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->idHabitacion == $idHabitacion && $asignacion[$i]->estado == 'Reserva')
            {
                $resultado[$aux] = $asignacion[$i];
                $aux++;
            }
        }
        if($resultado != null){
           return json_encode($resultado);
         }
       else return false;
     }
     catch (Exception $e){
      report($e);
      return $error;
    }
  }

  public function confirmarReserva (Request $request, $id){
    try{
    $habitacion=\App\asignacion::where('id','=',$id);
    $habitacion->update(['estado'=>$request->input('estado'),
                          'personas_habitacion'=>$request->input('personas_habitacion'),
                          'abono'=>$request->input('abono'),
                          'horaEntrada'=>substr($request->input('horaEntrada'), 11, strlen($request->input('horaEntrada'))-1)]);
    return 'Cliente actualizado exitosamente';
  }
    catch (Exception $e) {
        report($e);
        return 'Error!, Verifique que los datos esten ingresados correctamente';
    }
  }

    public function reservacion(Request $request){
        try{

        $habitacion = \App\habitacione::all();
        $inicioReserva = new DateTime($request->input('fechaEntrada'));
        $finReserva = new DateTime($request->input('fechaSalida'));
        $habitacionesEnUso = [];
        $habitacionesDisponibles = [];
        $habitacionesLegarTarde=[];

        $asignaciones = \App\asignacion::all();

        foreach ($asignaciones as $asignacion) {
          $fechaInicio = new DateTime($asignacion->fechaEntrada);
          $fechaSalida = new DateTime($asignacion->fechaSalida);
          if (($inicioReserva > $fechaInicio && $inicioReserva < $fechaSalida ) ||  ($finReserva > $fechaInicio && $finReserva < $fechaSalida) || ($fechaInicio > $inicioReserva && $fechaSalida < $finReserva   ) )
          {
            array_push( $habitacionesEnUso, $asignacion->idHabitacion);
          }
        }

        foreach ($asignaciones as $asignacion) {
          $fechaInicio = new DateTime($asignacion->fechaEntrada);
          $fechaSalida = new DateTime($asignacion->fechaSalida);
          if ($inicioReserva == $fechaSalida)
          {
            array_push( $habitacionesLegarTarde, $asignacion->idHabitacion);
          }
        }

        foreach ( $habitacion as $hab){
          $disponible = true;

          foreach ($habitacionesEnUso as $habUso) {
            if($habUso == $hab->codigo ){
              $disponible = false;
            }
          }
          if($disponible){
            array_push( $habitacionesDisponibles, $hab);
          }
        }

        foreach ($habitacionesDisponibles as $habDisponibles) {
          $llegarTarde=false;
          foreach ($habitacionesLegarTarde as $habTarde) {
            if($habTarde== $habDisponibles->codigo ){
              $llegarTarde = true;
            }
          }
          $habDisponibles['llegarTarde']=$llegarTarde;
        }

        return $habitacionesDisponibles;
       }
        catch (Exception $e) {
        report($e);
        return $error;
       }
    }

    public function consultaGeneralReservas(){
        try{
        $reservas = \App\asignacion::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($reservas);$i++)
          {
              if($reservas[$i]->estado == 'Reserva')
              {
                  $resultado[$aux] = $reservas[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function deleteReserva ($id){
        try{
        $reserva=\App\asignacion::findOrFail($id);
        $reserva->delete();
        return 'Reserva eliminada exitosamente';
        }
        catch (Exception $e) {
            report($e);
            return $error;
        }
    }

    public function consultaIdClienteReserva($idCliente){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->idCliente == $idCliente && $asignacion[$i]->estado == "Reserva")
              {
                  $resultado[$aux] = $asignacion[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function consultaIdHabitacionReserva($idHabitacion){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->idHabitacion == $idHabitacion && $asignacion[$i]->estado == "Reserva")
              {
                  $resultado[$aux] = $asignacion[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function consultaFechaEntradaReserva($fechaEntrada){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $fecha = substr($fechaEntrada, 0, 10);
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->fechaEntrada == $fecha && $asignacion[$i]->estado == "Reserva")
              {
                  $resultado[$aux] = $asignacion[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function consultaHoraEntradaReserva($horaEntrada){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $hora = substr($horaEntrada, 11, strlen($horaEntrada)-1);
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->horaEntrada == $hora && $asignacion[$i]->estado == "Reserva")
              {
                  $resultado[$aux] = $asignacion[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function kardexReservas($fechaEntrada){
        try{
        $reservas = \App\asignacion::all();
        $aux = 0;
        $fecha=substr($fechaEntrada, 0, 10);
        $resultado = null;
          for($i = 0;$i < count($reservas);$i++)
          {
              if($reservas[$i]->fechaEntrada == $fecha && $reservas[$i]->estado == 'Reserva')
              {
                  $resultado[$aux] = $reservas[$i];
                  $aux++;
              }
          }
          if($resultado != null){
             return json_encode($resultado);
           }
         else return false;
       }
       catch (Exception $e){
        report($e);
        return $error;
      }
    }

    public function sendEmail(Request $r){

      $data = $r->all();
       Mail::to($r->input('correo'))->send(new SendMail($data));
    }
}
