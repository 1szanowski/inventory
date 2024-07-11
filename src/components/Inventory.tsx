import React, { useState } from "react";
import data from "../data/data";
import Item from "../interfaces/interface";
import styles from "./inventory.module.css";

const Inventory = () => {
  const [sourceData, setSourceData] = useState<Item[]>(data);
  const [targetStateObj, setTargetStateObj] = useState<Item[]>([]);
  const [armorState, setArmorState] = useState<Item[]>([]);
  const [draggableItem, setDraggableItem] = useState<Item | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const handleDragStart = (item: Item) => {
    setDraggableItem(item);
  };

  const handleDragOver = (event: React.DragEvent, zone: string) => {
    event.preventDefault();
    setHoveredZone(zone);
  };

  const handleDragLeave = () => {
    setHoveredZone(null);
  };

  const handleDropToTarget = () => {
    if (draggableItem && draggableItem.type === "weapon") {
      setTargetStateObj((prev) => [...prev, draggableItem]);
      setSourceData((prev) => prev.filter((el) => el.id !== draggableItem.id));
      setDraggableItem(null);
    }
    setHoveredZone(null);
  };

  const handleDropToSource = () => {
    if (draggableItem && !sourceData.find(el => el.id === draggableItem.id)) {
      setSourceData((prev) => [...prev, draggableItem]);
      setTargetStateObj((prev) =>
        prev.filter((el) => el.id !== draggableItem.id)
      );
      setArmorState((prev) => prev.filter((el) => el.id !== draggableItem.id));
      setDraggableItem(null);
    }
    setHoveredZone(null);
  };

  const handleDropToArmour = () => {
    if (draggableItem && draggableItem.type === "armour") {
      setArmorState((prev) => [...prev, draggableItem]);
      setSourceData((prev) => prev.filter((el) => el.id !== draggableItem.id));
      setDraggableItem(null);
    }
    setHoveredZone(null);
  };

  const sourceObjects = sourceData.map((el) => (
    <div
      className={styles.obj}
      draggable
      key={el.id}
      onDragStart={() => handleDragStart(el)}
    >
      <h3>{el.name}</h3>
      {el.hasOwnProperty("damage") ? (
        <p>Damage: {el.damage}</p>
      ) : (
        <p>Protection: {el.protection}</p>
      )}
    </div>
  ));

  const targetObjects = targetStateObj.map((el) => (
    <div
      className={styles.obj}
      draggable
      key={el.id}
      onDragStart={() => handleDragStart(el)}
    >
      {el.name}
    </div>
  ));

  const armourObjects = armorState.map((el) => (
    <div
      className={styles.obj}
      draggable
      key={el.id}
      onDragStart={() => handleDragStart(el)}
    >
      {el.name}
    </div>
  ));

  return (
    <div>
      <div className={styles.mainBack}>
      <div
        onDragOver={(event) => handleDragOver(event, "target")}
        onDragLeave={handleDragLeave}
        onDrop={handleDropToTarget}
        className={`${styles.dropZones} ${
          hoveredZone === "target" ? styles.dropZonesHover : ""
        }`}
      >
        <h3>Weapons:</h3>
        {targetObjects}
      </div>

      <div
        onDragOver={(event) => handleDragOver(event, "armour")}
        onDragLeave={handleDragLeave}
        onDrop={handleDropToArmour}
        className={`${styles.dropZones} ${
          hoveredZone === "armour" ? styles.dropZonesHover : ""
        }`}
      >
        <h3>Armor:</h3>
        {armourObjects}
      </div>
      </div>
      <h3>All inventory</h3>

      <div
        onDragOver={(event) => handleDragOver(event, "source")}
        onDragLeave={handleDragLeave}
        onDrop={handleDropToSource}
        className={`${styles.dropZones_bottom} ${
          hoveredZone === "source" ? styles.dropZonesHover : ""
        }`}
      >
        {sourceObjects}
      </div>
    </div>
  );
};

export default Inventory;
