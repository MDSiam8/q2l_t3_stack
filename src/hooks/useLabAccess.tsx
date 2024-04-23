// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { api } from '~/utils/api'


// const useLabAccess = (labName: string) => {
//     const router = useRouter();
//     const { user } = useUser();
//     const [isLoading, setIsLoading] = useState(true);


//     useEffect(() => {
//         if (!user || isLoading) return;
//         if (!user || !userHasAccessToLab(user, labName)) {
//             router.push("/dashboard"); // Redirect to dashboard if user doesn't have access
//         }
//     }, [user, router, labName]);

//     return user && userHasAccessToLab(user, labName);
// };

// const userHasAccessToLab = async (user, labName) => {
//     try {
//         const { data: labAccess, isLoading: labLoading, error } = api.user.getOneUserLabByName.useQuery({ userId: user.id, name: labName });
//         if (error) {
//             console.error("Error fetching lab access:", error);
//             return false;
//         }
//         return labAccess ? true : false;
//     } catch (error) {
//         console.error("Error fetching lab access:", error);
//         return false;
//     }
// };

// export default useLabAccess;