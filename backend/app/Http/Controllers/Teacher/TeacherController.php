<?php
namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Teacher;
use App\Http\Controllers\Controller;
use Validator;

class TeacherController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['editProfile']]);
    }
    //Teachers can edit their profile when they log in 
    


}