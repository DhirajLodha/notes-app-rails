import React, { useState } from "react";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ username, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("authToken"); // Clear token from storage
    navigate("/login"); // Redirect to login page
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery); // Trigger the search in the parent component
    }
  };

  const onClearSearch = () => {
    setSearchQuery(""); // Clear the input field
    if (onSearch) {
      onSearch(""); // Clear the search results in the parent component
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo name={username} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
