import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Counter() {
  const { data } = useQuery({ queryKey: ["count"] });
  const queryClient = useQueryClient();

 const {mutate} = useMutation({
    mutationFn: () => {
      // let newCount
      // return ( newCount = data + 1); 

      return true
         
    },
    onSuccess: () => {
       queryClient.setQueryData(["count"], (oldData) => {
         return oldData + 1; // Update based on previous value
       });
    },
  });

  return (
    <div>
      <p>The current count is: {data}</p>
      <button onClick={() => mutate()}>Increment from Other Component</button>
    </div>
  );
}

