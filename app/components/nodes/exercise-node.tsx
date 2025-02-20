"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Exercise } from "../../types/graph";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { shuffleArray } from "../utils";
import { useEffect } from "react";
import React from "react";


const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})


const ExerciseNode: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })
  const [items, setItems] = React.useState<string[]>([]);
  useEffect(() => {
    setItems(shuffleArray([...exercise.distractors, ...exercise.answers]));
  }
  , [exercise]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative flex items-center bg-transparent">
          <div className="left-0 w-8 h-8 bg-transparent rounded-full z-0"></div>
          <Button className="absolute -left-4 ml-4 px-4 py-6 rounded-l-full rounded-r-md text-xl" variant='slate'>
            <span className="flex items-center justify-center w-4 h-4 bg-slate-500 rounded-full"></span>
            <span>🏃‍♂️</span>
            <span className="">{ exercise.question }</span>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-slate-50 border-slate-600 p-0">
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">MCQ</FormLabel>
                      <FormDescription>
                        { exercise.question }
                      </FormDescription>
                    </div>
                    {items.map((item, id_) => (
                      <FormField
                        key={id_}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={id_.toString()}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(id_.toString())}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, id_.toString()])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== id_.toString()
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                { item }
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex center w-full text-center'>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ExerciseNode;
