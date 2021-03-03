<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class usuario extends Model
{
    //

    public $timestamps = false;
    protected $fillable = ['id','user','password','rol'];
}
