<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('sort_order')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'detail' => 'nullable|string',
            'funding' => 'required|string|max:255',
            'period' => 'nullable|string|max:255',
            'status' => 'string|max:50',
            'sort_order' => 'integer',
            'image' => 'nullable|string',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'summary' => 'nullable|string',
            'detail' => 'nullable|string',
            'funding' => 'string|max:255',
            'period' => 'nullable|string|max:255',
            'status' => 'string|max:50',
            'sort_order' => 'integer',
            'image' => 'nullable|string',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
