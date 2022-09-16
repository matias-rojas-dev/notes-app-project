import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Note from "../components/note/Note";
import { getNotesByCategory } from "../config";

const Search = (props) => {
  const [notes, setNotes] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    async function getNotes() {
      const { notes } = await getNotesByCategory(`/notes-by-category/${slug}`);
      setNotes(notes);
    }
    getNotes();
  }, [slug]);

  return (
    <>
      <div className="home-container">
        {notes.length !== 0 ? (
          notes.map((note) => <Note key={note._id} note={note} />)
        ) : (
          <p className="search-p">
            This category don't have any note &#128531;
          </p>
        )}
      </div>
      <Link to="/create-note">
        <button className="home-create-note">Create a note</button>
      </Link>
    </>
  );
};

export default Search;
