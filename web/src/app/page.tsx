import { EntryModal } from "./_components/EntryModal";

export default async function Home() {
  return (
    <div className=" bg-[url('/bg.avif')] h-[100vh] bg-cover bg-center bg-repeat " >
      <div className="flex items-center justify-center" >
        <EntryModal />
      </div>
    </div>
  );
}
