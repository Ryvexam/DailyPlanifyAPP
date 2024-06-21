import { ChangeEvent } from 'react';

interface NotesProps {
  notes: string;
  onNotesChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSave: () => void;
}

const Notes = ({ notes, onNotesChange, handleSave }: NotesProps) => {
  return (
    <div className="p-4 bg-white shadow dark:border-strokedark dark:bg-boxdark">
      <textarea
        value={notes}
        onChange={onNotesChange}
        rows={10}
        className="w-full p-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
        placeholder="Write your notes here..."
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 text-white bg-primary rounded hover:bg-secondary transition duration-300 ease-in-out"
      >
        Save
      </button>
    </div>
  );
};

export default Notes;
