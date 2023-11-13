
import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import ApparatusTab from './ApparatusTab';
import ChemicalsTab from './ChemicalsTab';

const InventorySystem = (props : any) => {
    const [activeTab, setActiveTab] = useState('apparatus');
    const [isInventoryVisible, setIsInventoryVisible] = useState(false);

    const handleTabChange = (tab : string) => {
        setActiveTab(tab);
    };

    const toggleInventory = () => {
        setIsInventoryVisible(!isInventoryVisible);
    };

    return (
        <>
            {/* Button to toggle the inventory visibility */}
            <Html zIndexRange={[10, 0]} 
            className='fixed bottom-full left-1/2 transform -translate-x-1/2' 
            transform
            rotation-y={3.14/180 * 90}
            position={[0,6,0]}
            {...props}
            >
                <button
                    onClick={toggleInventory}
                    className="m-4 p-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 z-50"
                >
                    {isInventoryVisible ? 'Close Inventory' : 'Open Inventory'}
                </button>
            </Html>


            {/* Inventory panel */}
            {isInventoryVisible && (
                <Html zIndexRange={[110, 105]} center style={{ width: '100vw', height: '100vh' }} >
                    <div className="inventory" style={{ width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)' }}>
                        <div className="inventory-header" style={{ display: 'flex', justifyContent: 'space-evenly', padding: '1rem' }}>
                            <button onClick={() => handleTabChange('apparatus')} style={buttonStyle(activeTab === 'apparatus')}>
                                Apparatus
                            </button>
                            <button onClick={() => handleTabChange('chemicals')} style={buttonStyle(activeTab === 'chemicals')}>
                                Chemicals
                            </button>
                            <button onClick={toggleInventory} style={buttonStyle()}>
                                Close
                            </button>
                        </div>
                        <div className="inventory-content" style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
                            {activeTab === 'apparatus' ? <ApparatusTab /> : <ChemicalsTab />}
                        </div>
                    </div>
                </Html>
            )}
        </>
    );
};

const buttonStyle = (isActive = false) => ({
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    background: isActive ? 'white' : 'gray',
    color: isActive ? 'black' : 'white',
    cursor: 'pointer',
    outline: 'none',
});

export default InventorySystem;