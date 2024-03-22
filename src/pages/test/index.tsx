"use client";
import { Button } from "../../components/ui/button";
import { api } from '~/utils/api'

export default function Dashboard() {
    const { mutate } = api.logger.create.useMutation();
    
    const handleClick = () => {
        mutate({ user: "Jeffery", activity: "test!"})
    }

  return (
    <div className="relative"> {/*Relative H-full not filling the entire page for some reason */}
        <main>
          <div className="main-content">
            <Button onClick={handleClick}>
                Click
            </Button>
          </div>
        </main>
    </div>
  );
}