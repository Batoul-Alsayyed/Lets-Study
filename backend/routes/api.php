<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\RatingController;

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
    Route::post('/getUserById', [UserController::class, 'getUserById']);    
    Route::post('/add_rating', [RatingController::class, 'addRating']); 
    Route::post('/updateRateNumberByUserId', [RatingController::class, 'updateRateNumberByUserId']); 
    

});
Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'
], function ($router) {
    Route::post('/add_teacher', [AdminController::class, 'addTeacher']);  
    Route::post('/add_studyfield', [AdminController::class, 'addStudyField']);  
    Route::post('/add_degree', [AdminController::class, 'addDegree']);  
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'student'
], function ($router) {
    Route::post('/add_student', [StudentController::class, 'addStudent']); 
    Route::post('/getStudentById', [StudentController::class, 'getStudentById']);  
    Route::get('/students', [StudentController::class, 'getAllStudents']);  
});

