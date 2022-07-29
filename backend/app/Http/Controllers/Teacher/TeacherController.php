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
        $this->middleware('auth:api', ['except' => ['getTeacherById']]);
    }
       public function getTeacherById(Request $request){
        $teacher = Teacher::orderBy('created_at','desc')->get();
        $teacher = Teacher::where('user_id', $request->user_id)->get();

            return response()->json([
                "status" => "Success",
                "teacher" => $teacher
            ], 200);

    }

    


}