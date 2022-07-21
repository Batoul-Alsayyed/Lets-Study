<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Rating;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use App\Models\UserType;
use App\Http\Controllers\Controller;
use Validator;

class RatingController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['addRating','updateRateNumberByUserId']]);
    }
    public function addRating(Request $request) {
        //first lets add the new rating in ratings table 
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|integer',
            'rate_number'=>'required|integer',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $rating = Rating::create(array_merge(
                    $validator->validated()
                ));
        return response()->json([
            'message' => 'Rating successfully added',
            'rating' => $rating
        ], 201); 

    }
     //then its time to update rate_number for the user in students/teachers table
    public function updateRateNumberByUserId(Request $request){
        //get user type id
        $user = User::orderBy('created_at','desc')->get();
        $user_type_id = User::where('id', $request->user_id)->get('user_type_id');
        
        //search through user types table to get user type name 
       
        $user_type = UserType::orderBy('created_at','desc')->get();
        $user_type = UserType::where('id', $user_type_id)->get('type');

        $user_current_rate_number = 1;

        if (strcasecmp($user_type,"student")){
            //now that we know that the user is a student
            //loop over rating students table with user_id=$request->user_id
            //get rate_number for this specific user_id 
            
            $student = User::orderBy('created_at','desc')->get();
            $user_current_rate_number= Student::where('user_id', $request->user_id)->get('rate_number'); 

            //now looping over ratings table with user_id
            //get all ratings where user-id = $request->user_id
            $ratings = Rating::where('user_id', $request->user_id)->get('rate_number');
            //sum all rate number for this user 
            $avg;
            $sum = 0;
            $counter = 0;
            foreach ($ratings as $key => $value) {
                //echo "{$value["rate_number"]} ";
                $sum = $sum + $value["rate_number"];
                $counter++;
            }

                if ($counter>0){
                    $avg = $sum/$counter;
                    $avg = round($avg);
                }
            //update rate_number value from students table by the calculated average rate to this user 
            $User_Update = Student::where("user_id", $request->user_id)->update(["rate_number" => $avg]);
            $user_new_rate_number= Student::where('user_id', $request->user_id)->get('rate_number'); 
        }

        else if (strcasecmp($user_type,"teacher")){
            $teacher = User::orderBy('created_at','desc')->get();
            $user_current_rate_number= Teacher::where('user_id', $request->user_id)->get('rate_number'); 
            $ratings = Rating::where('user_id', $request->user_id)->get('rate_number');
            $avg;
            $sum = 0;
            $counter = 0;
            foreach ($ratings as $key => $value) {
                $sum = $sum + $value["rate_number"];
                $counter++;
            }
                if ($counter>0){
                    $avg = $sum/$counter;
                    $avg = round($avg);
                }
            $User_Update = Teacher::where("user_id", $request->user_id)->update(["rate_number" => $avg]);
            $user_new_rate_number= Teacher::where('user_id', $request->user_id)->get('rate_number'); 
        }
            return response()->json([
                "status" => "Success",
                "new rate" => $user_new_rate_number
            ], 200);

    }
    
}
