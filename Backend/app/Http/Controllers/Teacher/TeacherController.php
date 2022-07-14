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
        $this->middleware('auth:api', ['except' => ['addTeacher']]);
    }
    //Adding new teacher (a teacher is a user but with extra attributes)
    //Teachers will not be able to register their own accounts 
    //only admin can add them through admin panel

    public function addTeacher(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|integer',
            'image_link'=>'required|string',
            'rate_number'=>'required',
            'longitude'=>'required',
            'latitude'=>'required',
            'degrees_id'=>'required|integer',
            'study_fields_id'=>'required|integer',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $teacher = Teacher::create(array_merge(
                    $validator->validated()
                ));
        return response()->json([
            'message' => 'Teacher successfully added',
            'teacher' => $teacher
        ], 201);
    }
}