import { createPortal } from "react-dom";
import css from "../../Sidebaring/Children/Sidebar.module.css";
import { LuFlower } from "react-icons/lu";
import { CiBasketball } from "react-icons/ci";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { FaArrowsToDot } from "react-icons/fa6";
import { FaBluesky } from "react-icons/fa6";
import { AiOutlineAntDesign } from "react-icons/ai";
import { MdWorkspaces } from "react-icons/md";
import { FaPhoenixFramework } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { useState } from "react";

import aiPlanetsDesk from "./SVGs/aiPlanets-desk.jpg";
import pinkTreeDesk from "./SVGs/pinkTree-desk.jpg";
import skyCloudDesk from "./SVGs/skyCloud-desk.jpg";

export const BoardModaL = ({
  openModal,
  isboardmodalopen,
  isEditCreat,
  handleNewBoard,
  selection,
  setSelection,
  selectedBoard,
}) => {
  const [selectedIconId, setSelectedIconId] = useState("");
  const [selectedImgId, setSelectedImgId] = useState("");
  const [newSelection, setNewSelection] = useState({
    title: "",
    icon: "",
    image: "",
  });

  if (!isboardmodalopen) return null;

  const handleBoardTitle = (event) => {
    const title = event.target.value;
    setNewSelection((previous) => ({ ...previous, title }));
  };

  const handleSelectIcon = (event) => {
    const icon = event.target.id;
    if (icon) {
      setSelectedIconId(icon);
      setNewSelection((previous) => ({ ...previous, icon }));
      console.log("icon", icon);
    } else {
      console.error("No valid icon selected");
    }
  };

  const handleSelectImg = (event) => {
    const image = event.target.id;
    if (image) {
      setSelectedImgId(image); // Setează ID-ul imaginii selectate
      setNewSelection((previous) => ({ ...previous, image }));
      console.log("image", image);
    }
  };

  const handleSaveBtn = async (event) => {
    event.preventDefault();
    
    // Verificăm dacă se creează o tablă nouă
    if (isEditCreat === "Create board") {
      if (newSelection.icon === "") {
        alert("Please select an icon");
        return;
      } else if (newSelection.image === "") {
        alert("Please select an image");
        return;
      }
  
 
      if (selection.some((board) => board.titleBoard === newSelection.title)) {
        alert("The title is already in use");
      } else {
        try {
        
          const response = await fetch('http://localhost:2000/auth/boards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
            body: JSON.stringify({
              titleBoard: newSelection.title,
              background: newSelection.image, 
              icon: newSelection.icon,
              filter: 'default', 
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result = await response.json();
          
       
          setSelection((prev) => [...prev, result]);
          setNewSelection({ title: "", icon: "", image: "" });
          openModal();
        } catch (error) {
          console.error("Error creating board:", error);
          alert("Error creating board: " + error.message);
        }
      }
    } else if (isEditCreat === "Edit board") {

      if (newSelection.icon === "") {
        alert("Please select an icon");
        return;
      } else if (newSelection.image === "") {
        alert("Please select an image");
        return;
      }
  
      const index = selection.findIndex(
        (board) => board.titleBoard === selectedBoard
      );
  
      if (index !== -1) {
        const updatedSelection = [...selection];
        updatedSelection[index] = {
          ...updatedSelection[index],
          ...newSelection,
        };
        setSelection(updatedSelection);
        openModal();
        setNewSelection({ title: "", icon: "", image: "" });
      } else {
        console.log("Board not found for editing");
      }
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
        placeholder="Enter board title"
        onChange={handleBoardTitle}
        value={newSelection.title}
        required 
      />
      <p>Icons</p>

      <div className={css.boardIconsF} onClick={handleSelectIcon}>
        <LuFlower
          id="icon1"
          className={`${css.iconModal} ${
            selectedIconId === "icon1" ? css.activeIcon : ""
          }`}
        />
        <CiBasketball
          id="icon2"
          className={`${css.iconModal} ${
            selectedIconId === "icon2" ? css.activeIcon : ""
          }`}
        />
        <BsBoundingBoxCircles
          id="icon3"
          className={`${css.iconModal} ${
            selectedIconId === "icon3" ? css.activeIcon : ""
          }`}
        />
        <FaArrowsToDot
          id="icon4"
          className={`${css.iconModal} ${
            selectedIconId === "icon4" ? css.activeIcon : ""
          }`}
        />
        <FaBluesky
          id="icon5"
          className={`${css.iconModal} ${
            selectedIconId === "icon5" ? css.activeIcon : ""
          }`}
        />
        <AiOutlineAntDesign
          id="icon6"
          className={`${css.iconModal} ${
            selectedIconId === "icon6" ? css.activeIcon : ""
          }`}
        />
        <MdWorkspaces
          id="icon7"
          className={`${css.iconModal} ${
            selectedIconId === "icon7" ? css.activeIcon : ""
          }`}
        />
        <FaPhoenixFramework
          id="icon8"
          className={`${css.iconModal} ${
            selectedIconId === "icon8" ? css.activeIcon : ""
          }`}
        />
      </div>

      <p>Background</p>

      <div className={css.boardImageF} onClick={handleSelectImg}>
        <CiImageOff
          id="img1"
          className={`${selectedImgId === "img1" ? css.activeImg : ""}`}
        />
        <img
          src={pinkTreeDesk}
          alt="pink tree on a lake"
          id="img2"
          className={`${selectedImgId === "img2" ? css.activeImg : ""}`}
        />
        <img
          src={skyCloudDesk}
          alt="one big cloud on blue sky"
          id="img3"
          className={`${selectedImgId === "img3" ? css.activeImg : ""}`}
        />
        <img
          src={aiPlanetsDesk}
          alt="blue-viollet planets"
          id="img4"
          className={`${selectedImgId === "img4" ? css.activeImg : ""}`}
        />
      </div>

      <button type="submit" className={css.saveButtonF}>
        <FaPlus />
        <p>Save</p>
      </button>
    </form>,
    document.body 
  );
};
