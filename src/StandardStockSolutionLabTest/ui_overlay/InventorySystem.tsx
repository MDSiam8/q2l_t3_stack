import React, { useState } from "react";
import ApparatusTab from "./ApparatusTab";
import ChemicalsTab from "./ChemicalsTab";

interface InventorySystemProps {
  onItemSelect: (item: string, isCorrect: boolean) => void;
  selectedItems: { [key: string]: boolean };
  toggleInventory: () => void;
  isInventoryVisible: boolean;
}

const InventorySystem: React.FC<InventorySystemProps> = ({
  onItemSelect,
  selectedItems,
  toggleInventory,
  isInventoryVisible,
}) => {
  const [activeTab, setActiveTab] = useState("apparatus");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 transform ${
        isInventoryVisible ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out select-none`}
      style={{ width: "20rem" }}
    >
      {/* Inventory panel */}
      <div className="bg-white h-full shadow-xl overflow-y-auto">
        {/* Inventory Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-2">
            <button
              onClick={() => handleTabChange("apparatus")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "apparatus"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Apparatus
            </button>
            <button
              onClick={() => handleTabChange("chemicals")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "chemicals"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Chemicals
            </button>
          </div>
          {/* Close Button (X Icon) */}
          <button
            onClick={toggleInventory}
            className="text-gray-600 hover:text-gray-800 focus:outline-none bg-gray-200 rounded-full p-2" // Gray background with padding
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Inventory Content */}
        <div className="p-4">
          {activeTab === "apparatus" ? (
            <ApparatusTab
              onItemSelect={onItemSelect}
              selectedItems={selectedItems}
            />
          ) : (
            <ChemicalsTab
              onItemSelect={onItemSelect}
              selectedItems={selectedItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InventorySystem;
