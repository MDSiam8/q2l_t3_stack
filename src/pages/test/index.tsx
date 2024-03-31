"use client";
import { Button } from "../../components/ui/button";
import { api } from '~/utils/api'

export default function Dashboard() {
    const { mutate } = api.post.create.useMutation();

    const { } = api.post.getLatest.useQuery();
    
    const handleClick = () => {
        mutate({ name: "Jeffery"})
    }

    const handleClick2 = () => {
        
    }
  return (
    <div className="relative"> {/*Relative H-full not filling the entire page for some reason */}
        <main>
          <div className="main-content">
            <Button onClick={handleClick}>
                Click
            </Button>
          </div>
          <div className="main-content">
            <Button onClick={handleClick2}>
                Click 2
            </Button>
          </div>
        </main>
    </div>
  );
}