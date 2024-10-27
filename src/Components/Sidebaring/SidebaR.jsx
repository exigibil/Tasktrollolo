import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from "../Sidebaring/Children/Sidebar.module.css";
import { ListOfBoardS } from "../Sidebaring/Children/ListOfBoardS";
import { ReachHelPing } from "../Sidebaring/Children/ReachHelPing";
import { LogingOut } from "../Sidebaring/Children/LogingOut";
import { LogoSidebaR } from "../Sidebaring/Children/LogoSidebaR";
import { CreateBoarD } from "../Sidebaring/Children/CreateBoarD";
import { BoardModaL } from "../Sidebaring/Children/BoardModaL";
import { HelpModaL } from "../Sidebaring/Children/HelpModaL";
import { getBoards } from "../../Redux/selectors";

export const Sidebar = ({
  handleSidebarVisibility,
  sidebarVisibility,
  handleSelectedBoard,
}) => {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isEditCreate, setIsEditCreate] = useState("");
  const [selection, setSelection] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState("");

  const boardUser = useSelector(getBoards); // preia lista board-urilor din Redux

  useEffect(() => {
    if (boardUser) {
      setSelection(boardUser); // Actualizăm selecția cu board-urile din Redux
    }
  }, [boardUser]);

  const openModal = () => setIsBoardModalOpen(!isBoardModalOpen);
  const openHelpModal = () => setIsHelpModalOpen(!isHelpModalOpen);

  const handleEditCreate = (actionType) => setIsEditCreate(actionType);

  const handleBoardSelection = (boardName) => {
    setSelectedBoard(boardName);
    handleSelectedBoard(boardName);
  };

  return (
    <div className={css.sidebarF}>
      <div>
        <LogoSidebaR
          handleSidebarVisibility={handleSidebarVisibility}
          sidebarVisibility={sidebarVisibility}
        />
        <section className={css.myBoardsF}>
          <h5>My boards</h5>
          <hr />
          <CreateBoarD openModal={openModal} handleEditCreate={handleEditCreate} />
          <hr />
          {selection.length > 0 ? (
            <ListOfBoardS
              openModal={openModal}
              handleEditCreate={handleEditCreate}
              selection={selection}
              handleSelectedBoard={handleBoardSelection}
            />
          ) : (
            <p>No boards available. Create a new board.</p>
          )}
        </section>
      </div>
      <div>
        <ReachHelPing openHelpModal={openHelpModal} />
        <LogingOut />
        <BoardModaL
          openModal={openModal}
          isboardmodalopen={isBoardModalOpen}
          isEditCreat={isEditCreate}
          selection={selection}
          selectedBoard={selectedBoard}
          setSelection={setSelection}
        />
        {isHelpModalOpen && (
          <HelpModaL openHelpModal={openHelpModal} />
        )}
      </div>
    </div>
  );
};
