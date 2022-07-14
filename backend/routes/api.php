<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Student\StudentController;

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
Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::get('/user-profile', [UserController::class, 'userProfile']);    
    Route::post('/addUserType', [UserController::class, 'addUserType']);    
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'teacher'
], function ($router) {
    Route::post('/add_teacher', [TeacherController::class, 'addTeacher']);  
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'student'
], function ($router) {
    Route::post('/add_student', [StudentController::class, 'addStudent']);  
});
