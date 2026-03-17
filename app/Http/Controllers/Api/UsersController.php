<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json(User::orderBy('name')->get(['id', 'name', 'email', 'created_at']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ];

        if ($request->password) {
            $rules['password'] = 'string|min:6';
        }

        $request->validate($rules);

        $user->name = $request->name;
        $user->email = $request->email;
        
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent deleting yourself
        if (auth()->id() == $id) {
            return response()->json(['error' => 'Cannot delete your own account'], 400);
        }
        
        $user->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
