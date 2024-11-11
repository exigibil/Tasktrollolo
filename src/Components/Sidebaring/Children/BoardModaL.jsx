import { createPortal } from "react-dom";
import css from "../../Sidebaring/Children/Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, fetchBoards } from "../../../Redux/boardSlice";
import { getBoards } from "../../../Redux/selectors";
import { useState } from "react";

import { CiImageOff } from "react-icons/ci";
import aiPlanetsDesk from "./SVGs/aiPlanets-desk.jpg";
import pinkTreeDesk from "./SVGs/pinkTree-desk.jpg";
import skyCloudDesk from "./SVGs/skyCloud-desk.jpg";
import { LuFlower } from "react-icons/lu";
import { CiBasketball } from "react-icons/ci";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { FaArrowsToDot, FaBluesky, FaPhoenixFramework } from "react-icons/fa6";
import { AiOutlineAntDesign } from "react-icons/ai";
import { MdWorkspaces } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export const BoardModaL = ({ openModal, isboardmodalopen, isEditCreat }) => {
  const dispatch = useDispatch();
  const boardUser = useSelector(getBoards);

  const [selectedIconId, setSelectedIconId] = useState("");
  const [selectedImgId, setSelectedImgId] = useState("");
  const [newSelection, setNewSelection] = useState({
    titleBoard: "",
    background: "default",
    icon: "default",
    filter: "default",
  });

  if (!isboardmodalopen) return null;

  const handleBoardTitle = (event) => {
    const titleBoard = event.target.value;
    setNewSelection((previous) => ({ ...previous, titleBoard }));
  };

  const handleSelectIcon = (event) => {
    const icon = event.target.id;
    if (icon) {
      setSelectedIconId(icon);
      setNewSelection((previous) => ({ ...previous, icon }));
    }
  };

  const handleSelectImg = (event) => {
    const background = event.target.id;
    if (background) {
      setSelectedImgId(background);
      setNewSelection((previous) => ({ ...previous, background }));
    }
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setNewSelection((previous) => ({ ...previous, filter }));
  };

  const handleSaveBtn = async (event) => {
    event.preventDefault();

    if (
      newSelection.icon === "default" ||
      newSelection.background === "default"
    ) {
      alert("Select a background image.");
      return;
    }

    if (
      Array.isArray(boardUser) &&
      boardUser.some((board) => board.titleBoard === newSelection.titleBoard)
    ) {
      alert("Title is allready used.");

      return;
    }

    try {
      await dispatch(createBoard(newSelection)).unwrap();
      setNewSelection({
        titleBoard: "",
        icon: "default",
        background: "default",
        filter: "default",
      });
      openModal();
      dispatch(fetchBoards());
    } catch (error) {
      console.error("Error at creating board:", error);
      alert("Error at creating board: " + error.message);
    }
  };

  return createPortal(
    <form className={css.boardDetailsModalF} onSubmit={handleSaveBtn}>
      <button type="button" className={css.closingButtonF} onClick={openModal}>
        <IoMdClose />
      </button>
      <p>{isEditCreat}</p>
      <label htmlFor="boardTitleF">Board Title:</label>
      <input
        type="text"
        id="boardTitleF"
        name="boardTitleF"
        placeholder="Insert board name"
        onChange={handleBoardTitle}
        value={newSelection.titleBoard}
        required
      />

      <p>Iconuri</p>
      <div className={css.boardIconsF} onClick={handleSelectIcon}>
        <LuFlower
          id="icon-01"
          className={`${css.iconModal} ${
            selectedIconId === "icon-01" ? css.activeIcon : ""
          }`}
        />
        <CiBasketball
          id="icon-02"
          className={`${css.iconModal} ${
            selectedIconId === "icon-02" ? css.activeIcon : ""
          }`}
        />
        <BsBoundingBoxCircles
          id="icon-03"
          className={`${css.iconModal} ${
            selectedIconId === "icon-03" ? css.activeIcon : ""
          }`}
        />
        <FaArrowsToDot
          id="icon-04"
          className={`${css.iconModal} ${
            selectedIconId === "icon-04" ? css.activeIcon : ""
          }`}
        />
        <FaBluesky
          id="icon-05"
          className={`${css.iconModal} ${
            selectedIconId === "icon-05" ? css.activeIcon : ""
          }`}
        />
        <AiOutlineAntDesign
          id="icon-06"
          className={`${css.iconModal} ${
            selectedIconId === "icon-06" ? css.activeIcon : ""
          }`}
        />
        <MdWorkspaces
          id="icon-07"
          className={`${css.iconModal} ${
            selectedIconId === "icon-07" ? css.activeIcon : ""
          }`}
        />
        <FaPhoenixFramework
          id="icon-08"
          className={`${css.iconModal} ${
            selectedIconId === "icon-08" ? css.activeIcon : ""
          }`}
        />
      </div>

      <p>Fundal</p>
      <div className={css.boardImageF} onClick={handleSelectImg}>
        <CiImageOff
          id="default"
          className={`${selectedImgId === "default" ? css.activeImg : ""}`}
        />
        <img
          src={pinkTreeDesk}
          alt="Copac roz pe un lac"
          id="background01"
          className={`${selectedImgId === "background01" ? css.activeImg : ""}`}
        />
        <img
          src={skyCloudDesk}
          alt="Nor mare pe cer albastru"
          id="background02"
          className={`${selectedImgId === "background02" ? css.activeImg : ""}`}
        />
        <img
          src={aiPlanetsDesk}
          alt="Planete albastre și violete"
          id="background03"
          className={`${selectedImgId === "background03" ? css.activeImg : ""}`}
        />
      </div>

      <label htmlFor="filterSelect">Filtru:</label>
      <select
        id="filterSelect"
        value={newSelection.filter}
        onChange={handleFilterChange}
        className={css.filterSelectF}
      >
        <option value="default">Default</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className={css.saveButtonF}
        disabled={
          newSelection.icon === "default" ||
          newSelection.background === "default"
        }
      >
        <FaPlus />
        <p>Save</p>
      </button>
    </form>,
    document.body
  );
};
