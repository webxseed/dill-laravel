<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\People;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function index()
    {
        $people = People::orderBy('sort_order')->get();
        return response()->json($people);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'publications' => 'boolean',
            'type' => 'string|max:50',
            'alumni_topic' => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        $people = People::create($validated);
        return response()->json($people, 201);
    }

    public function show(People $person)
    {
        return response()->json($person);
    }

    public function update(Request $request, People $person)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'role' => 'string|max:255',
            'email' => 'nullable|email|max:255',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'publications' => 'boolean',
            'type' => 'string|max:50',
            'alumni_topic' => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        $person->update($validated);
        return response()->json($person);
    }

    public function destroy(People $person)
    {
        $person->delete();
        return response()->json(null, 204);
    }
}
