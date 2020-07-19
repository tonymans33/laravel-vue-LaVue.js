<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserResource;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json(['data' => UserResource::collection(User::latest()->paginate(10))]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateUserRequest $request
     * @return JsonResponse
     */
    public function store(CreateUserRequest $request)
    {
        $input = $request->validated();
        $input['password'] = Hash::make($request->password);

        return response()->json(['data' => new UserResource(User::create($input)) , 'msg' => 'User Created Successfully !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        return response()->json(['data' => new UserResource(User::find($id))]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param int $id
     * @return JsonResponse
     */

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);

        $input = $request->validated();

        $user->updated_at = Carbon::now();

        new UserResource($user->update($input));

        return response()->json(['msg' => 'User Updated Successfully !']);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $user = User::find($id);

        return response()->json(['data' =>$user->delete(), 'msg' => 'User Deleted Successfully !']);
    }
}
