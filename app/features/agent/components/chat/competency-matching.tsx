import { useAppStore } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Workflow } from "lucide-react";
import { useState } from "react";


const CompetencyMatchingFlowTrigger = () => {
  const docs = useAppStore((state) => state.docs);
  const [docId, setDocId] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [synthesis, setSynthesis] = useState<string | null>(null);

  const launchFlow = useAppStore((state) => state.launchFlow);

  const condition = docId !== null || synthesis !== null;

  const openDialog = () => {
    console.log('Opening matching dialog');
    setDocId(null);
    setTitle(null);
    setSynthesis(null);
  }


  const packPayload = () => {
    return {
      doc_id: docId,
      title: title,
      synthesis: synthesis,
    };
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Title changed to:', e.target.value);
    setTitle(e.target.value);
  }

  const handleSynthesisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Synthesis changed to:', e.target.value);
    setSynthesis(e.target.value);
  }

  const handleLaunch = () => {
    launchFlow(packPayload());
  }

  const selectDoc = (docId: string) => {
    console.log('Selected doc:', docId);
    setDocId(Number(docId));
  }

  return (
    <Dialog>
      <DialogTrigger
        className="px-4 py-2 rounded-full !text-stone-700 border-stone-200
          border bg-white hover:bg-stone-50 transition-all duration-200 ease-in-out
          inline-flex flex-row items-center justify-center shadow-sm
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-sm
          gap-2 whitespace-nowrap font-medium"
        onClick={openDialog}
      >
        <Workflow strokeWidth={1.75} className='h-4 w-4 stroke-amber-600' />
        <span>Competency Matching</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] !rounded-2xl">
        <DialogHeader>
          <DialogTitle className='text-center'>
            <div className='flex flex-row justify-start items-center space-x-2'>
              <Workflow strokeWidth={1.75} className='h-6 w-6 stroke-amber-600' />
              <span>Competency Matching</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Enter a title and synthesis or select a document
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="doc_id" className="text-right">
              Document
            </Label>
            <Select onValueChange={selectDoc}>
              <SelectTrigger className="col-span-3 bg-stone-100 rounded-lg px-4 py-2 text-sm">
                <SelectValue placeholder="Select a document" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Library documents</SelectLabel>
                  {
                    docs.map((doc) => (
                      <SelectItem
                        key={doc.id}
                        value={doc.id.toString()}
                        className='text-sm'
                      >
                        {doc.title ? doc.title : 'Untitled'}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              onChange={handleTitleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="synthesis" className="text-right">
              Synthesis
            </Label>
            <Input
              id="synthesis"
              className="col-span-3"
              onChange={handleSynthesisChange}
            />
          </div>
        </div>
        <DialogFooter className='flex flex-row sm:justify-center w-full items-center text-center'>
          <DialogClose>
            <Button
              type="submit"
              onClick={handleLaunch}
              className='px-4 py-2 rounded-full w-48'
              disabled={!condition}
              variant={condition ? 'default' : 'ghost'}
            >
              Launch
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CompetencyMatchingFlowTrigger;