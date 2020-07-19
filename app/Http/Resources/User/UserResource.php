<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'name' => $this->name,
          'password' => $this->password,
          'id' => $this->id,
          'email' => $this->email,
          'photo' => $this->photo,
          'bio' => $this->bio,
          'type' => $this->type,
          'created_at' => $this->created_at
        ];
    }
}
