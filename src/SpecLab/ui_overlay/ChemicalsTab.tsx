import React from "react";
import Image, { StaticImageData } from "next/image";
import uraniumImg from "../images/uranium.jpg";
import sampleImg from "../images/powder2.jpg";
import distilledWater from "../images/distilledwater.jpg";

type ChemicalItem = {
  name: string;
  image: StaticImageData;
  isCorrect: boolean;
};

type SelectedItems = {
  [key: string]: boolean;
};

type ChemicalsTabProps = {
  onItemSelect: (itemName: string, isCorrect: boolean) => void;
  selectedItems: SelectedItems;
};

const ChemicalsTab: React.FC<ChemicalsTabProps> = ({
  onItemSelect,
  selectedItems,
}) => {
  const chemicalItems: ChemicalItem[] = [
    { name: "Distilled Water", image: distilledWater, isCorrect: false },
    { name: "Powder Sample", image: sampleImg, isCorrect: true },
    { name: "Uranium", image: uraniumImg, isCorrect: false },
    // Add more items as needed
  ];

  const handleChemicalClick = (chemical: ChemicalItem) => {
    if (selectedItems[chemical.name]) {
      return; // Prevent re-selection
    }
    if (onItemSelect) {
      onItemSelect(chemical.name, chemical.isCorrect);
    }
  };

  const getItemClasses = (chemicalName: string): string => {
    let classes =
      "bg-white bg-opacity-50 p-2 rounded-lg shadow-md cursor-pointer border-2 flex flex-col justify-between ";
    if (selectedItems[chemicalName] !== undefined) {
      classes += selectedItems[chemicalName]
        ? "border-green-500 opacity-50 cursor-not-allowed"
        : "border-red-500 opacity-50 cursor-not-allowed";
    } else {
      classes += "border-gray-300 hover:border-blue-500";
    }
    return classes;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
      {chemicalItems.map((item, index) => (
        <div
          key={index}
          className={getItemClasses(item.name)}
          onClick={() => handleChemicalClick(item)}
        >
          <div className="flex justify-center">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-lg"
              draggable={false}
            />
          </div>
          <p className="pt-2 text-center text-sm font-medium text-gray-800">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChemicalsTab;
