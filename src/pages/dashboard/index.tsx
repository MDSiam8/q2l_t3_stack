"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "../../components/ui/card";
import { BellIcon, InfoIcon } from "lucide-react";
import Sidebar from "./Sidebar";
import Chatbot from "~/components/ChatBot";

//import Navbar from "@/components/Navbar";
//import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Empty from "../../components/Empty";
import ChatCanvas from "~/components/ChatCanvas";
//import { Notebook } from "@prisma/client";

interface Notebook {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
  completed: string;
  link: string;
  disabled: boolean;
}

// Reusable card component to display notebook details
const NotebookCard: React.FC<{ notebook: Notebook; disabled?: boolean }> = ({ notebook, disabled }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return '#FF8888';
      case 'In Progress':
        return '#FFFF88';
      case 'Completed':
        return '#8DC8FF';
      default:
        return 'black';
    }
  };

  return (
    <>
      {disabled ? (
        <div className="relative">
          <div className="absolute z-5 flex items-center justify-center w-full h-full">
            <div className="rounded-lg py-2 px-6 text-sm shadow-lg border select-none border-red-500 bg-red-100 text-red-900">
              Currently under maintenance. Will return soon!
            </div>
          </div>
          <div className="pointer-events-none opacity-50">
            <Card>
              {notebook.image !== "none" && <CardImage imageSrc={notebook.image} />}
              <CardHeader>
                <div className="notebook-title">
                  <CardTitle>{notebook.name}</CardTitle>
                </div>
              </CardHeader>
              {
              // <CardContent>
              //   <div className="completed-status" style={{ color: getStatusColor(notebook.completed) }}>
              //     <CardDescription>
              //       {notebook.completed}
              //     </CardDescription>
              //   </div>
              //   {/* <div className="last-updated">
              //     <CardDescription>
              //       Last updated: {notebook.updatedAt.toLocaleDateString()}
              //     </CardDescription>
              //   </div> */}
              //   {/* Add additional notebook details here */}
              // </CardContent>
              }
            </Card>
          </div>
        </div>
      ) : (
        <Link href={notebook.link} passHref>
          <Card>
            {notebook.image !== "none" && <CardImage imageSrc={notebook.image} />}
            <CardHeader>
              <div className="notebook-title">
                <CardTitle>{notebook.name}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        </Link>
      )}
    </>
  );
};

type NotebookPreviewProps = {
  notebooks: Notebook[];
};

const NotebookPreview: React.FC<NotebookPreviewProps> = ({ notebooks }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 md:pr-10">
      {notebooks.map((notebook) => (
        <NotebookCard 
          key={notebook.id} 
          notebook={notebook} 
          disabled={notebook.disabled}
        />
      ))}
    </div>
  );
};

const notebook: Notebook = {
  id: "1",
  image: "Abalance.png",
  name: "Analytical Balances",
  updatedAt: new Date(),
  completed: "Not Started",
  link: "/analytical_balance_lab",
  disabled: false
};

const notebook2: Notebook = {
  id: "2",
  image: "rotovap.jpeg",
  name: "RotoVap",
  completed: "Not Started",
  updatedAt: new Date(),
  link: "/rotovap_lab",
  disabled: false
};

const notebook3: Notebook = {
  id: "3",
  image: "buchner.jpeg",
  name: "Liquid-Liquid Extraction",
  completed: "Not Started",
  updatedAt: new Date(),
  link: "/extraction_lab",
  disabled: false
};

const notebook4: Notebook = {
  id: "4",
  name: "Micropipette",
  updatedAt: new Date(),
  link: "/updated_micropipette_lab",
  image: "micro.jpg",
  completed: "Not Started",
  disabled: false
}

const notebook5: Notebook = {
  id: "5",
  name: "Standard Solution",
  updatedAt: new Date(),
  link: "/standard_solution_lab",
  image: "standard_solution.jpeg",
  completed: "Not Started",
  disabled: false
}

const notebook6: Notebook = {
  id: "6",
  name: "Diluting Solution",
  updatedAt: new Date(),
  link: "/diluting_lab",
  image: "Diluting.jpg",
  completed: "Not Started",
  disabled: false
}


const notebook7: Notebook = {
  id: "7",
  name: "Voice Demo: Analytical Balance",
  updatedAt: new Date(),
  link: "/spline_balance_lab",
  image: "splineBalance.png",
  completed: "Not Started",
  disabled: false
}


const notebook8: Notebook = {
  id: "8",
  name: "Voice Demo: Gel Electrophoresis",
  updatedAt: new Date(),
  link: "/spline_gel_lab",
  image: "splineGel.png",
  completed: "Not Started",
  disabled: false
}


const access_labs = [notebook, notebook2, notebook3, notebook4, notebook6, notebook7, notebook8];


export default function Dashboard() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      // const res = await fetch('/api/getNotebooks');
      // const body = await res.json();
      // setNotebooks(body.notebooks);
      // setIsLoading(false);
      // notebooks will be fetched from the backend in the future
      // setNotebooks([notebook, notebook2, notebook3, notebook6]);
      setNotebooks([notebook, notebook2, notebook3, notebook4, notebook5, notebook6, notebook7, notebook8]);
      setIsLoading(false);
    };
    if (typeof window !== "undefined") {
      fetchNotebooks();
    }
  }, []);

  return (
    <div className="relative h-full bg-dashboard-bg"> {/*Relative H-full not filling the entire page for some reason */}
      <header className="flex h-14 items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40 lg:h-[60px]">
      </header>
      <div className="dashboard flex flex-row">
        {
        // <div className="w-64 flex-shrink-0">
        //   <Sidebar />
        // </div>
        }
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
          <div className="main-content">
            {isLoading ? (
              // Add loading skeleton UI here
              <div>Loading...</div>
            ) : notebooks?.length > 0 ? (
              <NotebookPreview notebooks={notebooks} />
            ) : (
              <Empty label="No labs to access!" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


//Gen UI:
//render a minicanvas of the new step?
//export the experience to the canvas