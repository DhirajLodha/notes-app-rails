import React, { useState, useEffect } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import API from "../../../api";

const AddEditNotes = ({ data, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type === "edit" && data) {
      setTitle(data.title);
      setContent(data.description);
      setTags(data.tags || []); // Directly assign tags as an array
    }
  }, [type, data]);

  const addNewNote = async () => {
    const params = {
      title,
      description: content,
      tags,
    };
    try {
      const response = await API.post("/notes/create", params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      console.log(response.data);
      if (response.status === 201) {
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
        setError(err.response.data.error || "Something went wrong.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  const updateNote = async () => {
    const params = {
      title,
      description: content,
      tags,
    };
    try {
      const response = await API.post(`/notes/update/${data.id}`, params, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      console.log(response.data);
      if (response.status === 201) {
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data);
        setError(err.response.data.error || "Something went wrong.");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    if (!tags || tags.length === 0) {
      setError("Please enter at least one tag");
      return;
    }

    setError("");
    if (type === "edit") {
      updateNote(); // Call update function for editing
    } else {
      addNewNote(); // Call add function for new note
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />{" "}
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title *</label>
        <input
          type="text"
          className="text-2l text-slate-950 outline-none"
          placeholder="Enter your Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content *</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Enter your Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS *</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Save Changes" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNotes;
