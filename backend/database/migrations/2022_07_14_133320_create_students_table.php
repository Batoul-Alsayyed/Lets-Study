<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('user_id');
            
            $table->string('account_type');
            $table->string('image_link');
            $table->decimal('rate_number');
            $table->decimal('longitude');
            $table->decimal('latitude');
            $table->foreignId('degrees_id');

           

            $table->foreignId('study_fields_id');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
