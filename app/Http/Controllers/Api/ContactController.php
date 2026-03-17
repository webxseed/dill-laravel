<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(ContactSubmission::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $submission = ContactSubmission::create($request->all());

        // Send email notification to admin
        $settings = \App\Models\Setting::pluck('value', 'key')->toArray();
        $toEmail = $settings['contact_email'] ?? config('mail.from.address', 'admin@example.com');
        
        $content = "New contact form submission:\n\n" .
            "Name: {$request->name}\n" .
            "Email: {$request->email}\n" .
            "Subject: {$request->subject}\n\n" .
            "Message:\n{$request->message}";

        try {
            $payload = [
                'api_key' => 'a7f3b9d2c1e84f6ab0c9d3e8f2b6a1c4',
                'subject' => 'New Contact Form Submission - DIIL',
                'content' => $content,
                'recipients' => $toEmail,
                'from' => 'DIIL-Materials',
                'from_name' => 'DIIL-Materials'
            ];

            $response = Http::acceptJson()
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post('https://crm.webxceed.com/api/send-email', $payload);

            if (!$response->successful()) {
                \Log::error('Email API error', ['status' => $response->status(), 'body' => $response->body()]);
            }
        } catch (\Exception $e) {
            \Log::error('Email API exception', ['message' => $e->getMessage()]);
        }

        return response()->json($submission, 201);
    }

    public function markAsRead($id)
    {
        $submission = ContactSubmission::findOrFail($id);
        $submission->is_read = true;
        $submission->save();
        return response()->json($submission);
    }

    public function destroy($id)
    {
        ContactSubmission::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
