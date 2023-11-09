import React, { useState } from 'react';

const ApparatusTab = () => {
  const [selectedItems, setSelectedItems] = useState({});

  const apparatusItems = [
    { name: 'Scientists', image: 'OIG.jpg', isCorrect: true },
    { name: 'Analytical Balance', image: 'balanceImg.jpg', isCorrect: true },
    { name: 'Beaker', image: 'beakerAnimeArt.png', isCorrect: false },
    // ... more items
  ];

  const handleItemClick = (item : any) => {
    // Update the state with the selected item and its correctness
    setSelectedItems((prev) => ({
      ...prev,
      [item.name]: item.isCorrect,
    }));

    // If the item is correct, call a function to display it in the main experience
    if (item.isCorrect) {
      displayItemInMainExperience(item.name);
    }
  };

  // This function will retrieve the appropriate border color based on the item's selection status
  const getBorderColor = (itemName) => {
    if (itemName in selectedItems) {
      return selectedItems[itemName] ? 'border-green-500' : 'border-rose-400';
    }
    return 'border-transparent';
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {apparatusItems.map((item, index) => (
        <div
          key={index}
          className={`bg-white p-2 rounded-lg shadow-md cursor-pointer border-2 ${getBorderColor(item.name)}`}
          onClick={() => handleItemClick(item)}
        >
          <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-md" />
          <p className="text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

// Replace this with your actual function for displaying items in the main experience
function displayItemInMainExperience(itemName : any) {
  // Logic to display the item in the main experience
  console.log(`Displaying "${itemName}" in the main experience.`);
}

export default ApparatusTab;
