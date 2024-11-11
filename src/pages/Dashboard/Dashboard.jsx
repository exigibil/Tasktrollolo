import React, { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebaring/SidebaR";
import Header from "../../Components/header/Header";
import useUser from "../../hooks/useUser";
import Boards from "../../Components/Boards/Boards";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards } from "../../Redux/boardSlice";
import { getBoards, getIsLoading } from "../../Redux/selectors";
import "./Dashboard.module.css";

const Dashboard = () => {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const { user, loading, error } = useUser();

  const dispatch = useDispatch();
  const boardUser = useSelector(getBoards); 
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    if (user) {
      dispatch(fetchBoards());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(boardUser) && boardUser.length > 0 && !selectedBoard) {
      setSelectedBoard(boardUser[0].titleBoard); 
    }
  }, [boardUser, selectedBoard]);

  const handleSidebarVisibility = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  const handleSelectedBoard = (boardName) => {
    setSelectedBoard(boardName); 
  };

  let sidebarID = sidebarVisibility ? "sidebarIsOpen" : "sidebarIsClosed";

  
  const selectedBoardData = boardUser?.find(board => board.titleBoard === selectedBoard);

  return (
    <div className="App" id={sidebarID}>
      <div className="sideBar">
        <Sidebar
          handleSidebarVisibility={handleSidebarVisibility}
          sidebarVisibility={sidebarVisibility}
          handleSelectedBoard={handleSelectedBoard}
        />
      </div>

      <div className="sharedlayoutF">
        <div className="navBar">
          <Header user={user} loading={loading} error={error} />
        </div>

        <div className="App-header">
          {isLoading ? (
            <p>Loading boards...</p>
          ) : selectedBoard && selectedBoardData ? (
            <Boards boardData={selectedBoardData} /> 
          ) : (
            <p id="selectBoard">Please select a board from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
