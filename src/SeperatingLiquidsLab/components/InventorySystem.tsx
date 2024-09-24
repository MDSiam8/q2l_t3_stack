import React, { useState } from "react";
import { Html } from "@react-three/drei";
import ApparatusTab from "./ApparatusTab";
import ChemicalsTab from "./ChemicalsTab";
import { HtmlProps } from "@react-three/drei/web/Html";

interface InventorySystemProps extends HtmlProps {
  onItemSelect: (item: string) => void;
}

const InventorySystem: React.FC<InventorySystemProps> = ({
  onItemSelect,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState("apparatus");
  const [isInventoryVisible, setIsInventoryVisible] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleInventory = () => {
    setIsInventoryVisible(!isInventoryVisible);
  };

  return (
    <>
      {/* Button to toggle the inventory visibility */}
      <Html
        zIndexRange={[10, 0]}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 select-none"
        {...props}
      >
        <button
          onClick={toggleInventory}
          className="z-50 m-4 rounded-md bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          {isInventoryVisible ? "Close Inventory" : "Open Inventory"}
        </button>
      </Html>

      {/* Inventory panel */}
      {isInventoryVisible && (
        <Html zIndexRange={[110, 105]} fullscreen>
          <div
            className="inventory-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
            }}
          >
            <div
              className="inventory"
              style={{
                width: "80%",
                height: "60%",
                background: "white",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                className="inventory-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                  background: "#f0f0f0",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <div>
                  <button
                    onClick={() => handleTabChange("apparatus")}
                    style={buttonStyle(activeTab === "apparatus")}
                  >
                    Apparatus
                  </button>
                  <button
                    onClick={() => handleTabChange("chemicals")}
                    style={buttonStyle(activeTab === "chemicals")}
                  >
                    Chemicals
                  </button>
                </div>
                <button
                  onClick={toggleInventory}
                  style={closeButtonStyle()}
                  title="Close"
                >
                  &#x2715;
                </button>
              </div>
              <div
                className="inventory-content"
                style={{ overflowY: "auto", flex: 1, padding: "1rem" }}
              >
                {activeTab === "apparatus" ? (
                  <ApparatusTab onItemSelect={onItemSelect} />
                ) : (
                  <ChemicalsTab onItemSelect={onItemSelect} />
                )}
              </div>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

const buttonStyle = (isActive = false) => ({
  padding: "10px 20px",
  margin: "0 5px",
  border: "none",
  background: isActive ? "#007bff" : "#ccc",
  color: isActive ? "white" : "black",
  cursor: "pointer",
  outline: "none",
  borderRadius: "5px",
});

const closeButtonStyle = () => ({
  padding: "10px",
  margin: "0 5px",
  border: "none",
  background: "#ccc",
  color: "black",
  cursor: "pointer",
  outline: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  textAlign: "center",
  lineHeight: "20px",
  fontSize: "20px",
});

export default InventorySystem;
