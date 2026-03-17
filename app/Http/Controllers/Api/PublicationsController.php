<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;

class PublicationsController extends Controller
{
    public function index()
    {
        return response()->json(Publication::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $publication = Publication::create($request->all());
        return response()->json($publication, 201);
    }

    public function update(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);
        $publication->update($request->all());
        return response()->json($publication);
    }

    public function destroy($id)
    {
        Publication::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
