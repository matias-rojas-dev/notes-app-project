import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCategories, updateNote } from "../config";

const EditNote = (props) => {
  const { slug } = props.match.params;
  const [categories, setCategories] = useState([]);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    async function listNotes() {
      const { categories } = await getCategories("/list");
      setCategories(categories);
    }
    listNotes();
  }, []);


  const handleInputChange = (event) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputSubmit = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await updateNote("/note", note, slug);
        Swal.fire("Updated!", "", "success");
        props.history.push("/");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <form className="editNote-container" onSubmit={handleInputSubmit}>
      <input
        onChange={handleInputChange}
        name="title"
        type="text"
        placeholder="Title"
      />
      <select name="category" onChange={handleInputChange}>
        <option value="none" selected disabled>Select an option</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
            name={category.name}
          >
            {category.name}
          </option>
        ))}
      </select>
      <textarea
        onChange={handleInputChange}
        name="content"
        placeholder="Content"
      />

        <button disabled={!note.category} type="submit" className="home-create-note">
        Save changes
      </button>
    </form>
  );
};

export default EditNote;
