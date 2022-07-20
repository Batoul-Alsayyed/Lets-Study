<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeachersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();

            $table->integer('user_id')->unsigned();

            $table->foreign('user_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');  

            $table->string('image_link');
            $table->decimal('rate_number');
            $table->decimal('longitude');
            $table->decimal('latitude');
           $table->integer('degrees_id')->unsigned();

            $table->foreign('degrees_id')
                  ->references('id')->on('degrees')
                  ->onDelete('cascade');
            

            $table->integer('study_fields_id')->unsigned();

             $table->foreign('study_fields_id')
                  ->references('id')->on('study_fields')
                  ->onDelete('cascade');
            
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
        Schema::dropIfExists('teachers');
    }
}
