import { type NextPage } from "next";
import { EntryModal } from "../components/EntryModal";

const Home: NextPage = () => {
  return (
    <div className=" bg-[url('/bg.avif')] h-[100vh] bg-cover bg-center bg-repeat " >
      <div className="flex items-center justify-center" >
        <EntryModal />
      </div>
    </div>
  );
};

export default Home;

