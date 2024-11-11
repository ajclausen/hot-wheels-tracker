import React, { useState } from 'react';

interface NotesEditorProps {
  initialNotes?: string;
  onSave: (notes: string) => void;
  onClose: () => void;
}

export function NotesEditor({ initialNotes = '', onSave, onClose }: NotesEditorProps) {
  const [notes, setNotes] = useState(initialNotes);

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-32 p-2 border rounded-lg mb-4"
        placeholder="Add your notes here..."
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}