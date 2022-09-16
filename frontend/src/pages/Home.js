import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/category/Category";
import Note from "../components/note/Note";
import { getNotes, getCategories } from "../config";

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function listNotes() {
      const { notes } = await getNotes("/notes");
      const { categories } = await getCategories("/list");
      setData(notes);
      setCategories(categories);
    }
    listNotes();
  }, [data, categories]);

  return (
    <>
      <div className="home-container">
        {data.map((note) => (
          <Note key={note._id} note={note} category={categories} />
        ))}
      </div>
      <Link to="/create-note">
        <button className="home-create-note">Create a note</button>
      </Link>
      <div className="home-category">
        <h3>Categories</h3>
        <div>
          {categories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </div>
        <Link to="/create-category">
        <button className="home-create-category">Create a category</button>
      </Link>
      </div>
    </>
  );
};

export default Home;
