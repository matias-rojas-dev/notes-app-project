import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteNote, enableOrDisabledNote } from "../../config";

const Note = ({ note }) => {
  const { title, content, updatedAt, slug, archived } = note;
  const d = new Date(updatedAt);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

  const changeArchivedStatus = async (event) => {
    await enableOrDisabledNote(
      `/note/${slug}`,
      archived === "true" ? false : true
    );
  };

  const handleDeleteNote = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteNote("/note", slug);
        Swal.fire("Deleted!", "", "success");
        window.location.reload(true);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="note-container">
      <div className="note-data">
        <h4>{title.toUpperCase()}</h4>
        <p>{content}</p>
        <p className="note-date">{date}</p>
      </div>
      <div className="note-menu">
        <Link to={`/edit/${slug}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDeleteNote}>Delete</button>
        <button onClick={changeArchivedStatus}>
          {archived === "true" ? "Show" : "Archive"}
        </button>
      </div>
    </div>
  );
};

export default Note;
