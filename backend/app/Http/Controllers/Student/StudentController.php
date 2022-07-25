<?php
namespace App\Http\Controllers\Student;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Http\Controllers\Controller;
use Validator;

class StudentController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['addStudent','getStudentById','getAllStudents']]);
    }
    //Adding new student (a student is a user but with extra attributes)
    //Students will  be able to register their own accounts first as a normal user
    //then when they fill those extra attributes they are going to be added to students table
    

    public function addStudent(Request $request) {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|integer|unique:students',
            'account_type'=>'required|integer', //if 0-> free member, 1->pro member
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
        $student = Student::create(array_merge(
                    $validator->validated()
                ));
        return response()->json([
            'message' => 'Student successfully added',
            'student' => $student
        ], 201);
    }
        public function getStudentById(Request $request){
        $student = Student::orderBy('created_at','desc')->get();
        $student = Student::where('user_id', $request->user_id)->get();

            return response()->json([
                "status" => "Success",
                "student" => $student
            ], 200);

    }
        public function getAllStudents(){
        $students = Student::all();
        
        return response()->json([
            "status" => "Success",
            "students" => $students
        ], 200);
    }
}