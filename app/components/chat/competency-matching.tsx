import { useAppStore } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


const CompetencyMatchingFlowTrigger = () => {
  const [docId, setDocId] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [synthesis, setSynthesis] = useState<string | null>(null);

  const launchFlow = useAppStore((state) => state.launchFlow);

  const packPayload = () => {
    return {
      doc_id: docId,
      title: title,
      synthesis: synthesis,
    };
  }

  const handleLaunch = () => {
    launchFlow(packPayload());
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Enter a title and synthesis or select a document
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Synthesis
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Launch Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CompetencyMatchingFlowTrigger;