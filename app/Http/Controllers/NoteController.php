<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        // get notes where user_id matches $user.id
        return $note = Note::query()->orderBy('created_at', 'desc')->paginate(10);
        //dd($note);
       // return Inertia::render('Note/Index', ['notes' => $note]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|max:255',
            'note' => 'required',
        ]);
        $newNote = new Note;
        $newNote->user_id = $request->user_id;
        $newNote->note = $request->note;
        $newNote->save();
        return $newNote;
        //$newNote = Note::factory($validatedData);
        //$newNote->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        return 'show note id: ' . $id;
//        return Inertia::render('Note/{$id}', [
//            //'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
//            //'status' => session('status'),
//            'note' => $note
//        ]);
    }



    /**
     * Update the specified resource in storage.
     * should return a bool success/fail
     */
    public function update(Request $request, String $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|max:255',
            'note' => 'required',
        ]);

        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Note not found'], 404);
        } else {
            $note->user_id = $request->user_id;
            $note->note = $request->note;
            $note->save();
            return response()->json(['message' => 'Note updated successfully'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, String $id): \Illuminate\Http\JsonResponse
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Note not found'], 404);
        } else {
            Note::destroy($id);
            return response()->json(['message' => 'Note removed successfully'], 200);
        }
    }
}
