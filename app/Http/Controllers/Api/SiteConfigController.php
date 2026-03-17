<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Illuminate\Http\Request;

class SiteConfigController extends Controller
{
    public function index()
    {
        $configs = SiteConfig::all()->pluck('value', 'key');
        return response()->json($configs);
    }

    public function update(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            SiteConfig::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
        return response()->json(['message' => 'Configs updated']);
    }
}
