import { connectToMongoDB } from "@/lib/mongodb";
import Jobs from "@/models/Jobs";
import { useEffect } from "react";

const useJobDB = async () => {
  const changeStream = Jobs.watch();

  useEffect(() => {
    console.log("change: ", changeStream.next());
  }, [changeStream]);
  return {};
};

export default useJobDB;
