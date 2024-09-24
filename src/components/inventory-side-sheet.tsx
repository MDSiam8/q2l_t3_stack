import { useState, ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Menu } from "lucide-react";

const apparatusItems = [
  { name: "Beaker", image: "/placeholder.svg?height=100&width=100" },
  { name: "Test Tube", image: "/placeholder.svg?height=100&width=100" },
  // Add other apparatus items here
];

const chemicalItems = [
  { name: "Hydrochloric Acid", image: "/placeholder.svg?height=100&width=100" },
  { name: "Sodium Hydroxide", image: "/placeholder.svg?height=100&width=100" },
  // Add other chemical items here
];

// Modify the component to accept children as a prop
export function InventorySideSheetComponent({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("apparatus");

  return (
    // <div className="h-screen w-full relative flex">
       <div className="h-screen w-full relative">
       {/* <Canvas className="absolute inset-0 bg-gray-900"> */}
         {/* Add your 3D scene elements here */}
       {/* </Canvas> */}
       {children}
    {/* Left Side: Inventory Panel with reduced width */}
      <div className="w-[300px] sm:w-[350px]">
        <div className="absolute top-4 left-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-gray-200 hover:bg-gray-300">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] h-full sm:w-[350px] sm:max-w-none">
              <div className="h-full flex flex-col">
                <h2 className="text-lg font-semibold mb-4">Inventory</h2>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="apparatus" className="text-sm font-medium">
                      Apparatus
                    </TabsTrigger>
                    <TabsTrigger value="chemicals" className="text-sm font-medium">
                      Chemicals
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex-grow">
                    <TabsContent value="apparatus" className="h-full">
                      <InventoryGrid items={apparatusItems} />
                    </TabsContent>
                    <TabsContent value="chemicals" className="h-full">
                      <InventoryGrid items={chemicalItems} />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Right Side: Canvas (or any children passed to this component) */}
      {/* <div className="flex-grow h-full"> */}
        {/* {children} This will render the Canvas passed as a child */}
      {/* </div> */}
    </div>
  );
}

function InventoryGrid({ items }: { items: { name: string; image: string }[] }) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pr-4">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-2">
              <div className="aspect-square relative mb-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-sm font-medium text-center truncate">{item.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}



// import { useState } from "react"
// import { Canvas } from "@react-three/fiber"
// import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
// import { Card, CardContent } from "~/components/ui/card"
// import { ScrollArea } from "~/components/ui/scroll-area"
// import { Button } from "~/components/ui/button"
// import Image from "next/image"
// import { Menu } from "lucide-react"

// const apparatusItems = [
//   { name: "Beaker", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Test Tube", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Bunsen Burner", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Microscope", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Pipette", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Thermometer", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Flask", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Petri Dish", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Centrifuge", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Spectrophotometer", image: "/placeholder.svg?height=100&width=100" },
// ]

// const chemicalItems = [
//   { name: "Hydrochloric Acid", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Sodium Hydroxide", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Ethanol", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Sulfuric Acid", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Glucose", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Copper Sulfate", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Sodium Chloride", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Potassium Permanganate", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Ammonium Nitrate", image: "/placeholder.svg?height=100&width=100" },
//   { name: "Calcium Carbonate", image: "/placeholder.svg?height=100&width=100" },
// ]

// export function InventorySideSheetComponent() {
//   const [activeTab, setActiveTab] = useState("apparatus")

//   return (
//     <div className="h-screen w-full relative">
//       <Canvas className="absolute inset-0 bg-gray-900">
//         {/* Add your 3D scene elements here */}
//       </Canvas>

//       <div className="absolute top-4 left-4">
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="bg-gray-200 hover:bg-gray-300">
//               <Menu className="h-4 w-4" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-[400px] sm:w-[540px] sm:max-w-none">
//             <div className="h-full flex flex-col">
//               <h2 className="text-lg font-semibold mb-4">Inventory</h2>
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
//                 <TabsList className="grid w-full grid-cols-2 mb-4">
//                   <TabsTrigger value="apparatus" className="text-sm font-medium">
//                     Apparatus
//                   </TabsTrigger>
//                   <TabsTrigger value="chemicals" className="text-sm font-medium">
//                     Chemicals
//                   </TabsTrigger>
//                 </TabsList>
//                 <div className="flex-grow">
//                   <TabsContent value="apparatus" className="h-full">
//                     <InventoryGrid items={apparatusItems} />
//                   </TabsContent>
//                   <TabsContent value="chemicals" className="h-full">
//                     <InventoryGrid items={chemicalItems} />
//                   </TabsContent>
//                 </div>
//               </Tabs>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </div>
//   )
// }

// function InventoryGrid({ items }: { items: { name: string; image: string }[] }) {
//   return (
//     <ScrollArea className="h-[calc(100vh-8rem)]">
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pr-4">
//         {items.map((item, index) => (
//           <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
//             <CardContent className="p-2">
//               <div className="aspect-square relative mb-2">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-cover rounded-md"
//                 />
//               </div>
//               <p className="text-sm font-medium text-center truncate">{item.name}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </ScrollArea>
//   )
// }

