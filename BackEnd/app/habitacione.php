<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class habitacione extends Model
{
    //
    public $timestamps = false;
    protected $fillable = ['codigo','tipo','valor','numero_personas','descripcion','disponibilidad','limpieza'];
}
