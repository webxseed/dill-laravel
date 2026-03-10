<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemsController extends Controller
{
    public function index(Request $request)
    {
        $menu = $request->query('menu');
        if ($menu) {
            $items = MenuItem::where('menu', $menu)->where('is_visible', true)->orderBy('sort_order')->get();
        } else {
            $items = MenuItem::orderBy('menu')->orderBy('sort_order')->get();
        }
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = MenuItem::create($request->all());
        return response()->json($item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = MenuItem::findOrFail($id);
        $item->update($request->all());
        return response()->json($item);
    }

    public function destroy($id)
    {
        MenuItem::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
