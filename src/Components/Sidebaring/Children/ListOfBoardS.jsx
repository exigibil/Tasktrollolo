import React, { useState } from "react";
import css from "../../Sidebaring/Children/Sidebar.module.css";
import { TfiPencil } from "react-icons/tfi";
import { IoTrashOutline } from "react-icons/io5";
import { LuFlower } from "react-icons/lu";
import { CiBasketball } from "react-icons/ci";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { FaArrowsToDot } from "react-icons/fa6";
import { FaBluesky } from "react-icons/fa6";
import { AiOutlineAntDesign } from "react-icons/ai";
import { MdWorkspaces } from "react-icons/md";
import { FaPhoenixFramework } from "react-icons/fa6";

export const ListOfBoardS = ({
  openModal,
  handleEditCreate,
  selection,
  handleSelectedBoard,
}) => {
  const [selectedBoard, setSelectedBoard] = useState("");



  

  const iconSeen = (icon) => {
    switch (icon) {
      case "icon-01":
        return <LuFlower id="icon1" />;
      case "icon-02":
        return <CiBasketball id="icon2" />;
      case "icon-03":
        return <BsBoundingBoxCircles id="icon3" />;
      case "icon-04":
        return <FaArrowsToDot id="icon4" />;
      case "icon-05":
        return <FaBluesky id="icon5" />;
      case "icon-06":
        return <AiOutlineAntDesign id="icon6" />;
      case "icon-07":
        return <MdWorkspaces id="icon7" />;
      case "icon-08":
        return <FaPhoenixFramework id="icon8" />;
      default:
        return null;
    }
  };
  const handleBTN = (event) => {
    const boardId = event.target.closest('li').id;
    setSelectedBoard(boardId);
    handleSelectedBoard(boardId);
}



  
  return (
    <ul className={css.boardsListF}>
        {selection.map((el) => (
            <li 
                key={el._id} 
                id={el.titleBoard} 
                onClick={handleBTN}
                className={selectedBoard === el.titleBoard ? css.activeBoard : ""}
            >
                <div className={css.namingBoardF}>
                    <p>{iconSeen(el.icon)}</p>
                    <p>{el.titleBoard}</p> 
                </div>
                <div className={css.modifyBoardF}>
                    <button name="Edit board" onClick={() => { handleEditCreate("Edit board"); openModal(); }}>
                        <TfiPencil />
                    </button>
                    <button>
                        <IoTrashOutline />
                    </button>
                </div>
            </li>
        ))}
    </ul>
);
};