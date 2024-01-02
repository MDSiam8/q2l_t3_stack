'use client'
import { UserButton } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { BellIcon, InfoIcon } from "lucide-react"
import Sidebar from './Sidebar';

//import Navbar from "@/components/Navbar";
//import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import Empty from "../../components/Empty";
//import { Notebook } from "@prisma/client";

interface Notebook {
  id: string,
  name: string,
  updatedAt: Date
}

type NotebookPreviewProps = {
  notebooks: Notebook[];
};

const NotebookPreview: React.FC<NotebookPreviewProps> = ({ notebooks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:pr-10">
      {notebooks.map((notebook) => (
        <NotebookCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
};

const NotebookCard: React.FC<{ notebook: Notebook }> = ({ notebook }) => {
  return (
    <Link href={`/lab`} passHref>
      {/* 'passHref' ensures the href prop is passed to the underlying DOM element */}
        <Card>
          <CardHeader>
            <CardTitle>{notebook.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add additional notebook details here */}
          </CardContent>
        </Card>
    </Link>
  );
};

const notebook: Notebook = {
  id: "1",
  name: "Analytical Balances",
  updatedAt: new Date()
}

export default function Dashboard() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotebooks = async () => {
      // const res = await fetch('/api/getNotebooks');
      // const body = await res.json();
      // setNotebooks(body.notebooks);
      // setIsLoading(false);
      setNotebooks([notebook])
      setIsLoading(false);
    };
    if (typeof window !== "undefined") {
      fetchNotebooks();
    }
  }, []);

  return (
    
    <div className="h-full relative">
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40">
          {/* <Sidebar /> */}
          <div className="ml-auto flex items-center gap-4">
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            
            </div>
          <div>
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
