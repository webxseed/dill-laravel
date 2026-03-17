<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,gif,webp,svg|max:5120',
            'folder' => 'nullable|string',
        ]);

        $folder = $request->input('folder', 'uploads');
        $file = $request->file('file');
        
        // Generate unique filename
        $extension = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $extension;
        
        // Store in public disk
        $path = $file->storeAs($folder, $filename, 'public');
        
        return response()->json([
            'path' => '/storage/' . $path,
            'filename' => $filename,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        $path = str_replace('/storage/', '', $request->input('path'));
        
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['success' => true]);
        }
        
        return response()->json(['error' => 'File not found'], 404);
    }
}
