import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex  w-full h-full items-center justify-center gap-4 p-4">
      <div className="flex flex-col shadow-2xl bg-[#141414] items-center justify-center w-2xl border-1 h-full rounded-lg">
        <h1 className="text-2xl font-semibold font-serif">{`</Codegenie>`}</h1>
        <p className="text-xs text-muted-foreground">Your personal engineer, just one prompt away.</p>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3 p-6">
        <div className="flex flex-col items-center">
          <h1 className="text-lg">Sign in</h1>
          <p className="text-xs text-muted-foreground">
            Welcome to Codegenie-AI
          </p>
        </div>
        <Button variant="outline" size="lg" className="gap-2">
          <Image
            src="/google-icon-logo.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
