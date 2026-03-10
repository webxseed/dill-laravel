<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class People extends Model
{
    protected $fillable = [
        'name',
        'role',
        'email',
        'location',
        'bio',
        'image',
        'publications',
        'type',
        'alumni_topic',
        'sort_order',
    ];

    protected $casts = [
        'publications' => 'boolean',
    ];
}
