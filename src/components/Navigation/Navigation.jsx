import "./Navigation.scss";
import logo from "../../assets/images/logo_blue_2.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import AddModal from "../AddModal/AddModal";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // add modal function
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);

  //search function
  // useEffect(() => {
  //   const searchBook = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8080/api/books?keyword=${searchKeyword}`
  //       );

  //       console.log(res.data);
  //     } catch (error) {
  //       console.error("Error fetching books:", error.response.data);
  //     }
  //   };

  //   if (searchKeyword.length > 1) {
  //     searchBook();
  //   }
  // }, [searchKeyword]);

  // const handleSearch = (event) => {
  //   setSearchKeyword(event.target.value);
  // };

  const handleSearchChange = (event) => {
    event.preventDefault(); // ページの再読み込みを防ぐ
    if (searchKeyword.trim()) {
      history.push(`/?search=${searchKeyword}`); // クエリパラメータにキーワードを追加
    }
  };

  const handleSearchSubmit = (event) => {
    if (searchKeyword.trim()) {
      navigate(`/?search=${searchKeyword}`);
    }
  };

  return (
    <div className="navigation">
      <div className="navigation__img-container">
        <Link to="/" className="navigation__link">
          <img src={logo} alt="logo" className="navigation__img" />
        </Link>
      </div>
      <div className="navigation__search-container">
        {/* <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            className="navigation__search-input"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </form> */}
      </div>
      <div className="navigation__menu-container">
        <button
          className={`navigation__menu-button ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="navigation__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className={`navigation__menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li className="navigation__modal" onClick={toggleAddModal}>
              Add New Book
            </li>
          </ul>
          {isAddModalOpen && <AddModal toggleAddModal={toggleAddModal} />}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
