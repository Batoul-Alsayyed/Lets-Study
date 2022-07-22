<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Teacher;
use App\Models\StudyField;
use App\Models\Degree;
use App\Http\Controllers\Controller;
use Validator;

class AdminController extends Controller{
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
        public function addDegree(Request $request) {

        $validator = Validator::make($request->all(), [
            'name'=>'required|string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $degree = Degree::create(array_merge(
                    $validator->validated()
                ));
        return response()->json([
            'message' => 'Degree successfully added',
            'degree' => $degree
        ], 201);
    }
        public function addStudyField(Request $request) {

        $validator = Validator::make($request->all(), [
            'name'=>'required|string',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $study_field = StudyField::create(array_merge(
                    $validator->validated()
                ));
        return response()->json([
            'message' => 'Studyfield successfully added',
            'Study_field' => $study_field
        ], 201);
    }
    public function getAllDegrees(){
        $degrees = Degree::all();
        
        return response()->json([
            "status" => "Success",
            "degrees" => $degrees
        ], 200);
    }
    public function getAllStudyFields(){
        $study_field = StudyField::all();
        
        return response()->json([
            "status" => "Success",
            "study_field" => $study_field
        ], 200);
    }
    public function getStudyfieldByName(Request $request){
        $studyfield = StudyField::orderBy('created_at','desc')->get();
        $studyfield = StudyField::where('name', $request->name)->get();

            return response()->json([
                "status" => "Success",
                "studyfield" => $studyfield
            ], 200);

    }

}