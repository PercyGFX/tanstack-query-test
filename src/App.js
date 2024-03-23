// App.js
import React, { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(0)

  // fetch data to query
  const { data: counts, isLoading } = useQuery({
    queryFn: () => Promise.resolve({ count: count }),
    queryKey: ["count"],
  });

  //mutation

  const { mutateAsync: increaseCount } = useMutation({
    mutationFn: async (incrementBy) => {
      
      setCount((old)=>{
        return old + incrementBy
      })
      return count

    },
    onSuccess: () => {
      queryClient.invalidateQueries(["count"]);
    },
  });

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <h1>{counts.count}</h1>
      <button onClick={async () =>  increaseCount(counts.count)}>Add</button>
    </div>
  );
};

export default App;
