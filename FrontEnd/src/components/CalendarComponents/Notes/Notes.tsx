import { useState } from 'react';
import axios from 'axios';
import API_URL from '../../customenv.tsx';

const Notes = () => {
  const [notes, setNotes] = useState<string>('');

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/api/notes/`, { notes });
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow dark:border-strokedark dark:bg-boxdark">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        className="w-full p-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
        placeholder="Write your notes here..."
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 text-white bg-primary rounded hover:bg-secondary transition duration-300 ease-in-out "
      >
        Save
      </button>
    </div>
  );
};

export default Notes;
