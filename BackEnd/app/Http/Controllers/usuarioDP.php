<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Facades\Requests;
use App\usuario;

class usuarioDP extends Controller
{
    //
    public function verificar(Request $r){
      try{
      $usuarios = \App\usuario::all();
      $aux = 0;
      $resultado = null;

      for($i = 0;$i < count($usuarios);$i++)
      {
          if($usuarios[$i]->user == $r->input('user') && $usuarios[$i]->password == $r->input('password'))
          {
              $resultado[$aux] = $usuarios[$i];
              $aux++;
          }
      }
      if($resultado != null){

         return json_encode($resultado[0]);
       }
     else return null;
     }
      catch (Exception $e) {
      report($e);
      return $error;
     }
    }

    public function consultaUsuario($usuario){
        try{
        $usuarios = \App\usuario::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($usuarios);$i++)
          {
              if($usuarios[$i]->user == $usuario)
              {
                  $resultado[$aux] = $usuarios[$i];
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

    public function consultaUsuarioRol($rol){
        try{
        $usuarios = \App\usuario::all();
        $aux = 0;
        $resultado = null;
          for($i = 0;$i < count($usuarios);$i++)
          {
              if($usuarios[$i]->rol == $rol)
              {
                  $resultado[$aux] = $usuarios[$i];
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

    public function putUsuario(Request $request, $id)
    {
        try{
        $usuario=\App\usuario::findOrFail($id);
        $usuario ->user=$request->input('user');
        $usuario ->password=$request->input('password');
        $usuario ->rol=$request->input('rol');
        $usuario->save();
        return 'Usuario actualizado exitosamente';}
        catch (Exception $e) {
            report($e);
            return 'Error!, Verifique que los datos esten ingresados correctamente';
        }

    }

    public function deleteUsuario ($id){
        try{
        $usuario=\App\usuario::findOrFail($id);
        $usuario->delete();
        return 'Usuario eliminado exitosamente';
        }
        catch (Exception $e) {
            report($e);
            return $error;
        }
    }

    public function consultaGeneralUsuarios(){
        try{
        $usuarios = \App\usuario::all();
        return json_encode($usuarios);
       }
        catch (Exception $e) {
        report($e);
        return $error;
       }
    }


    public function postUsuario(Request $request)
   {
     if($this->consultaUsuario($request->input('user'))==null){
        $registro = new usuario();
        $registro->id = 0;
        $registro->user = $request->input('user');
        $registro->password = $request->input('password');
        $registro->rol = $request->input('rol');
        $registro->save();
        return 'Exito';
      }
      else {
        return $this->consultaCodigo($request->input('user'));
      }
  }

}
