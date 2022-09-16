import React, { useEffect, useState } from 'react'
import Note from '../components/note/Note';
import { getNotesArchived } from '../config';

const Archived = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function listArchivedNotes() {
          const {notesArchived} = await getNotesArchived("/notes-archived");
          setNotes(notesArchived);
        }
        listArchivedNotes();
      }, [notes]);

  return (
    <div className="home-container">
        {
            notes.map( note => (
                <Note key={note._id} note={note} />
            ))
        }
    </div>
  )
}

export default Archived