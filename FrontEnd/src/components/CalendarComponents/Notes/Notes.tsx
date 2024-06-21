import { ChangeEvent } from 'react';

interface NotesProps {
  notes: string;
  onNotesChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSave: () => void;
}

const Notes = ({ notes, onNotesChange, handleSave }: NotesProps) => {
  return (
    <div className="p-4 max-sm:bg-slate-50 bg-white shadow dark:border-strokedark dark:bg-boxdark">
      <h2 className="mb-3 text-xl text-center text-primary font-bold italic">La note du jour !</h2>
      <textarea
        value={notes}
        onChange={onNotesChange}
        rows={5}
        className="w-full p-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
        placeholder="Notez ici..."
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