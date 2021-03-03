<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cliente extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['id','nombre','apellido','direccion','telefono','correo'];
}
