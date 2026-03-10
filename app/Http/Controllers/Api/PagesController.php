<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index()
    {
        return response()->json(Page::all());
    }

    public function show($slug)
    {
        $page = Page::where('slug', $slug)->first();
        if (!$page) {
            return response()->json(['error' => 'Page not found'], 404);
        }
        return response()->json($page);
    }

    public function store(Request $request)
    {
        $page = Page::create($request->all());
        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);
        $page->update($request->all());
        return response()->json($page);
    }

    public function destroy($id)
    {
        Page::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
