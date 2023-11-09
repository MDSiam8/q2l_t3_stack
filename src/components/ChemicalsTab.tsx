import React from 'react';

const ChemicalsTab = () => {
  const chemicalItems = [
    { name: 'Powder Sample', image: 'powder.jpg' },
    { name: 'Chemical B', image: 'chemicalB.jpg' },
    { name: 'Chemical C', image: 'chemicalC.jpg' },
    // Add more items as needed
  ];

  return (
    <div className="grid grid-cols-6 gap-4 mt-4 p-4">
      {chemicalItems.map((item, index) => (
        <div key={index} className="bg-white p-2 rounded-lg shadow-md select-none">
          <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-md" />
          <p className="text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ChemicalsTab;
