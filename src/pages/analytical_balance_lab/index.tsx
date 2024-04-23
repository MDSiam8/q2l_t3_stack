import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { api } from '~/utils/api';
import { Button } from "~/components/ui/button";
import Experience from "~/AnalyticalBalanceLab/components/Experience";


function LabAccessDeniedPage() {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold mb-4">You don't have access to the lab</div>
      <Button onClick={handleBackToDashboard}>Back to Dashboard</Button>
    </div>
  );
}

function MyApp() {
  const { user } = useUser();
  const userId = user?.id ?? null;
  const [canAccess, setCanAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: labAccess, refetch: labRefetch, isLoading: labLoading, error } = api.user.getOneUserLabByName.useQuery({ userId: userId, name: "Analytical Balances" });

  useEffect(() => {
    // only fetch when userId is loaded
    if (!userId) return;
    labRefetch().then((res) => {
      if (res.data !== null) {
        setCanAccess(true);
      }
    }).catch((error) => {
      console.error('Error fetching lab:', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    if (labLoading) return;
      if (userId && labAccess === null) {
      setCanAccess(false);
    }
  }, [userId, labLoading, labAccess]);

  if (!userId || isLoading) {
    return null; 
  }

  return canAccess ? (
    <div>
      <Experience />
    </div>
  ) : (
    <LabAccessDeniedPage />
  );
}

export default MyApp;
