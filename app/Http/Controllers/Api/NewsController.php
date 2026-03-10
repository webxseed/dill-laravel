<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        return response()->json(News::where('is_visible', true)->orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $news = News::create($request->all());
        return response()->json($news, 201);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $news->update($request->all());
        return response()->json($news);
    }

    public function destroy($id)
    {
        News::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
