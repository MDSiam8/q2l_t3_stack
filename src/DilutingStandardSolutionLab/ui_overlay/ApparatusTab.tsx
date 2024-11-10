import Image, { StaticImageData } from "next/image";
import React from "react";
import beakerImg from "../images/beaker.png";

type ApparatusItem = {
  name: string;
  image: StaticImageData;
  isCorrect: boolean;
};

type SelectedItems = {
  [key: string]: boolean;
};

type ApparatusTabProps = {
  onItemSelect: (itemName: string, isCorrect: boolean) => void;
  selectedItems: SelectedItems;
};

const ApparatusTab: React.FC<ApparatusTabProps> = ({
  onItemSelect,
  selectedItems,
}) => {
  const apparatusItems: ApparatusItem[] = [
    { name: "Beaker", image: beakerImg, isCorrect: true },
    { name: "Glass Pipette", image: beakerImg, isCorrect: true },
    { name: "Glass Dropper", image: beakerImg, isCorrect: true },
    { name: "Stopper", image: beakerImg, isCorrect: true },
  ];

  const handleItemClick = (item: ApparatusItem) => {
    if (selectedItems[item.name]) {
      return; // Prevent re-selection
    }
    if (onItemSelect && typeof onItemSelect === "function") {
      onItemSelect(item.name, item.isCorrect);
    }
  };

  const getItemClass = (itemName: string) => {
    if (itemName in selectedItems) {
      return selectedItems[itemName]
        ? "border-green-500 opacity-50 cursor-not-allowed"
        : "border-red-500 opacity-50 cursor-not-allowed";
    }
    return "border-gray-300 hover:border-blue-500";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
      {apparatusItems.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-lg border p-2 shadow-md flex flex-col justify-between bg-white bg-opacity-70 ${getItemClass(
            item.name
          )}`}
          onClick={() => handleItemClick(item)}
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

export default ApparatusTab;
