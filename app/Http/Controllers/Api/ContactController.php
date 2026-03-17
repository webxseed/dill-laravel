<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        
        try {
            Mail::raw(
                "New contact form submission:\n\n" .
                "Name: {$request->name}\n" .
                "Email: {$request->email}\n" .
                "Subject: {$request->subject}\n\n" .
                "Message:\n{$request->message}",
                function ($message) use ($toEmail) {
                    $message->to($toEmail)
                        ->subject('New Contact Form Submission - DIIL');
                }
            );
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Contact form email failed: ' . $e->getMessage());
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
