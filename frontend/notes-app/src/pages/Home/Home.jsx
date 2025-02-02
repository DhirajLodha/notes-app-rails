import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import API from "../../../api";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "../../utils/helper";
import { toast } from "react-toastify";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
        navigate("/login");
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.error("Token expired");
        localStorage.clear();
        navigate("/login");
        return;
      }

      const userId = decodedToken.user_id;
      const response = await API.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.data) {
        setUserInfo(response.data.data.username);
      }
    } catch (err) {
      console.error("Error fetching user info:", err.message);
      localStorage.clear();
      navigate("/login");
    }
  };

  const fetchNotes = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/login");

      const response = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.notes);
      if (response.data?.notes) {
        setNotes(response.data.notes);
        setFilteredNotes(response.data.notes);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Store the query for highlighting

    if (!query) {
      setFilteredNotes(notes);
      return;
    }

    const searchResults = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredNotes(searchResults);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await API.post(`/notes/destroy/${noteId}`);

      if (response) {
        alert("Note deleted successfully!");
        setNotes(notes.filter((note) => note.id !== noteId));
        setFilteredNotes(filteredNotes.filter((note) => note.id !== noteId));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    fetchNotes();
  }, []);

  const handleModalClose = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
    fetchNotes();
  };

  const handleEditNote = (note) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit", // Set type to "edit" for edit mode
      data: note, // Pass note data for editing
    });
  };

  return (
    <>
      <Navbar
        username={userInfo}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {loading ? (
            <p className="col-span-3 text-center text-gray-500">
              Loading notes...
            </p>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={highlightText(note.title, searchQuery)}
                date={formatDate(note.created_at)}
                content={highlightText(note.description, searchQuery)}
                tags={
                  Array.isArray(note.tags)
                    ? note.tags.join(" #")
                    : note.tags || ""
                }
                isPinned={note.pinned}
                onEdit={() => handleEditNote(note)}
                onDelete={() => handleDeleteNote(note.id)}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No notes found
            </p>
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        // onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        onRequestClose={handleModalClose}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 border"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          data={openAddEditModal.data}
          // onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          onClose={handleModalClose} // Pass the handleModalClose function to reload notes
        />
      </Modal>
    </>
  );
};

export default Home;
