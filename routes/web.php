<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::get('/artist/{name}', function ($name) {
    return view('artist', ['name' => $name]);
});

Route::get('/album/{id}', function ($id) {
    return view('album', ['id' => $id]);
});
