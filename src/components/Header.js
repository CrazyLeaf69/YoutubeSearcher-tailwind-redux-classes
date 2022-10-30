import React, { useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setResults } from "../features/resultSlice";

const Header = ({ setResults }) => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMode = () => setDarkTheme(!darkTheme);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${e.target.query.value}&type=video&maxResults=20&key=${process.env.REACT_APP_YT_KEY}`
    );
    const parsed = await result.json();

    setResults(parsed);

    if (window.location.pathname !== process.env.REACT_APP_PATH) {
      navigate(`${process.env.REACT_APP_PATH}?s=${e.target.query.value}`);
    } else {
      setSearchParams({ s: e.target.query.value });
    }
  };

  useEffect(() => {
    const handleParamSearch = async (search) => {
      const result = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&maxResults=20&key=${process.env.REACT_APP_YT_KEY}`
      );
      const parsed = await result.json();

      setResults(parsed);
    };
    const search = searchParams.get("s");
    if (search) {
      handleParamSearch(search);
    }
  }, [searchParams, setResults]);

  return (
    <header className="flex justify-center items-center relative p-4 bg-lime-100 dark:bg-gray-900">
      <form
        autoComplete="off"
        onSubmit={handleSearch}
        className="border-2 border-red-600 rounded-2xl p-2 gap-2 w-4/5 md:w-3/5 lg:w-2/5 flex justify-between center"
      >
        <input
          type="input"
          name="query"
          placeholder="Search..."
          className="bg-transparent focus:bg-transparent focus:outline-none placeholder-black dark:placeholder-white dark:text-white w-11/12"
        />
        <button type="submit">
          <FaSearch size="20" color={darkTheme ? "white" : ""} />
        </button>
      </form>
      <span onClick={handleMode} className="absolute right-0 lg:right-2">
        {darkTheme ? (
          <FaSun size="24" className="top-navigation-icon" />
        ) : (
          <FaMoon size="24" className="top-navigation-icon" />
        )}
      </span>
    </header>
  );
};

const mapDispatchToProps = { setResults };

export default connect(null, mapDispatchToProps)(Header);
