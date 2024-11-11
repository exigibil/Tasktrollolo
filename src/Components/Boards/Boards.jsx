import React, { useState } from "react";
import TrolloloCards from "../../Components/Cards/TrolloloCards";
import styles from "./Boards.module.css";
import Modal from "../../Components/CardModal/Cardmodal";
import { useToggle } from "../../Components/Usetoggle/Usetoggle";

const Boards = ({ boardData }) => {
  const [columns, setColumns] = useState(boardData.columns || []);
  const { isOpen, open, close } = useToggle();
  const [modalMode, setModalMode] = useState("add");
  const [activeColumnIndex, setActiveColumnIndex] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") {
      alert("Please enter a column title.");
      return;
    }

    setColumns([...columns, { title: newColumnTitle, cards: [] }]);
    setNewColumnTitle("");
  };

  const openAddCardModal = (columnIndex) => {
    setActiveColumnIndex(columnIndex);
    setModalMode("add");
    setSelectedCard({ 
      title: "",
      description: "",
      priority: "No Priority",
      deadline: new Date(),
    });
    open();
  };

  const handleSaveCard = (cardData) => {
    const updatedColumns = [...columns];
    
    if (modalMode === "add") {
      updatedColumns[activeColumnIndex].cards.push({
        ...cardData, 
        priorityc: cardData.priority, 
      });
    } else if (modalMode === "edit") {
      const cardIndex = updatedColumns[activeColumnIndex].cards.findIndex(
        (card) => card.title === selectedCard.title
      );
      updatedColumns[activeColumnIndex].cards[cardIndex] = {
        ...cardData,
        priorityc: cardData.priority, 
      };
    }

    setColumns(updatedColumns);
    close(); 
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardName}>{boardData.titleBoard}</div>

      <div className={styles.columnContainer}>
        <div className={styles.columnWrapper}>
          <div className={styles.columnContent}>
            {columns.map((column, colIndex) => (
              <div key={colIndex} className={styles.columnContainer}>
                <div className={styles.column}>
                  <div className={styles.columnTitle}>{column.title}</div>
                  <div className={styles.cardsContainer}>
                    {column.cards.map((card, cardIndex) => (
                      <TrolloloCards
                        key={cardIndex}
                        cardData={card} 
                        onEdit={(updatedCard) => {
                          const updatedColumns = [...columns];
                          updatedColumns[colIndex].cards[cardIndex] = updatedCard;
                          setColumns(updatedColumns);
                        }}
                        onDelete={() => {
                          const updatedColumns = [...columns];
                          updatedColumns[colIndex].cards.splice(cardIndex, 1);
                          setColumns(updatedColumns);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.addCardContainer}>
                  <button
                    onClick={() => openAddCardModal(colIndex)}
                    className={styles.addCardButton}
                  >
                    Add Card
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.addBtnContainer}>
            <div className={styles.addColumnContainer}>
              <div onClick={handleAddColumn} className={styles.addColumnButton}>
                <span>+</span>
              </div>

              <div className={styles.addColumnText}>
                <input
                  type="text"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  placeholder="Add another column"
                  className={styles.addColumnInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <Modal
          onClose={close}
          cardData={selectedCard || { title: "", description: "", priority: "", deadline: "" }}
          setCardData={handleSaveCard}
          setSelectedDate={() => {}}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default Boards;
