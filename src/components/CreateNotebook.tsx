'use client'

import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
//import Navbar from "@/components/Navbar";
//import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { Notebook } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface NotebookProps {
    name: string,
}

export const CreateNotebook = () => {
    const [input, setInput] = useState<string>('')
    const router = useRouter()

    const { mutate: notebook, isLoading } = useMutation({
        mutationFn: async ({ name }: NotebookProps) => {
            const payload: NotebookProps = { name }
            const { data } = await axios.post('/api/notebook/create', payload)
            return data
        },


        /*
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    
                }
            }
        }
        */

        onSuccess: (name) => {
            router.push(`/note-taker/${name}`)
        }
    })

    return (
        <div>
            <div className='mt-2'>
                <Textarea
                    id='notebook name'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={1}
                    placeholder='Notebook for ... '
                />
            </div>

            <div className='mt-2 flex justify-end'>
                <Button
                    disabled={input.length === 0}
                    onClick={() => notebook({ name: input })}>
                    Post
                </Button>
            </div>
        </div>
    )

}