import { EntryModal } from "@/components/EntryModal";

export default function Home() {
  return (
    <div className=" h-[100vh] bg-[url('/bg.avif')] bg-cover bg-center bg-repeat ">
      <div className="flex items-center justify-center">
        <EntryModal />
      </div>
    </div>
  );
}
