import { Textarea } from "@/components/ui/textarea";

export default function BuildPage() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex gap-4 flex-col items-center">
        <h1 className="text-2xl font-semibold font-serif">Welcome to Codegenie</h1>
        <Textarea placeholder="Describe your project..." className="w-96 text-2xl"></Textarea>
      </div>
    </div>
  );
}
