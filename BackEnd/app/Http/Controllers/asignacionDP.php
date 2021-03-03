<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use App\habitacione;
use App\asignacion;

class asignacionDP extends Controller
{
    //

    public function postAsignacion(Request $request)
   {
        $registro = new asignacion();
        $registro->id=0;
        $registro->idHabitacion = $request->input('idHabitacion');
        $registro->idCliente = $request->input('idCliente');
        $registro->personas_habitacion = $request->input('personas_habitacion');
        $registro->estado = $request->input('estado');
        $registro->abono = $request->input('abono');
        $registro->fechaEntrada = substr($request->input('fechaEntrada'), 0, 10);
        $registro->horaEntrada = substr($request->input('horaEntrada'), 11, strlen($request->input('horaEntrada'))-1);
        $registro->fechaSalida = substr($request->input('fechaSalida'), 0, 10);
        $registro->horaSalida = substr($request->input('horaSalida'), 11, strlen($request->input('horaSalida'))-1);

        $registro->save();
        return 'Exito';
  }

  public function putHabitacionDisponibilidad($codigo)
  {
      try{
      $habitacion=\App\habitacione::where('codigo','=',$codigo);
      $habitacion->update(['disponibilidad'=>'No'],
                          ['limpieza'=>'Requiere']);
      return 'Cliente actualizado exitosamente';
    }
      catch (Exception $e) {
          report($e);
          return 'Error!, Verifique que los datos esten ingresados correctamente';
      }
  }

  public function putHabitacionDisponibilidadOK($codigo)
  {
      try{
      $habitacion=\App\habitacione::where('codigo','=',$codigo);
      $habitacion->update(['disponibilidad'=>'Si'],
                          ['limpieza'=>'No Requiere']);
      return 'Cliente actualizado exitosamente';
    }
      catch (Exception $e) {
          report($e);
          return 'Error!, Verifique que los datos esten ingresados correctamente';
      }
  }

  public function borrarAsignacion (Request $request, $id){
      try{
      $habitacion=\App\asignacion::where('id','=',$id);
      $habitacion->delete();
      return 'Habitacion eliminada exitosamente';
      }
      catch (Exception $e) {
          report($e);
          return $error;
      }
  }

  public function kardex($fechaEntrada){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $fecha=substr($fechaEntrada, 0, 10);
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->fechaEntrada == $fecha)
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

  public function consultaGeneralAsignacion(){
      try{

      $asignacion = \App\asignacion::orderByDesc('id')->get();

      return json_encode($asignacion);
     }
      catch (Exception $e) {
      report($e);
      return $error;
     }
  }

  public function consultaIdCliente($idCliente){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->idCliente == $idCliente)
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

  public function consultaIdHabitacion($idHabitacion){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->idHabitacion == $idHabitacion)
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

  public function consultaFechaEntrada($fechaEntrada){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $fecha = substr($fechaEntrada, 0, 10);
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->fechaEntrada == $fecha)
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

  public function consultaHoraEntrada($horaEntrada){
      try{
      $asignacion = \App\asignacion::all();
      $aux = 0;
      $hora = substr($horaEntrada, 11, strlen($horaEntrada)-1);
      $resultado = null;
        for($i = 0;$i < count($asignacion);$i++)
        {
            if($asignacion[$i]->horaEntrada == $hora)
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


  //CHECKOUT
    public function consultaCheckOut($id){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->idCliente == $id && $asignacion[$i]->estado == 'activo')
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

    public function putHabitacionCheckOut($codigo)
    {
        try{
        $habitacion=\App\habitacione::where('codigo','=',$codigo);
        $habitacion->update(['disponibilidad'=>'Si',
                            'limpieza'=>'Requiere']);
        return 'Cliente actualizado exitosamente';
      }
        catch (Exception $e) {
            report($e);
            return 'Error!, Verifique que los datos esten ingresados correctamente';
        }
    }



    public function putAsignacionCheckOut(Request $request, $id)
    {
        try{
        $habitacion=\App\asignacion::where('id','=',$id);
        $habitacion->update(['fechaSalida'=>substr($request->input('fechaSalida'), 0, 10),
                              'horaSalida'=>substr($request->input('horaSalida'), 11, strlen($request->input('horaSalida'))-1),
                              'estado'=>'Finalizado']);
        return 'Cliente actualizado exitosamente';
      }
        catch (Exception $e) {
            report($e);
            return 'Error!, Verifique que los datos esten ingresados correctamente';
        }
    }

    public function consultaCheckOutId($idCliente){
        try{
        $asignacion = \App\asignacion::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($asignacion);$i++)
          {
              if($asignacion[$i]->idCliente == $idCliente && $asignacion[$i]->estado === 'activo')
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


}
