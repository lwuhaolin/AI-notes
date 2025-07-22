"use client";

import { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Fragment,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { AskAIAboutNoteAction } from "@/actions/note";
// import '@/styles/ai-response.css';
type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setRsponses] = useState<string[]>([]);

  const headleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setRsponses([]);
      }
      setOpen(isOpen);
    }
  };

  const headleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const headleClickInput = () => {
    textareaRef.current?.focus();
  };

  const headleSubmit = () => {
    if (!questionText.trim()) return;
    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(srcollToButton, 100);
    startTransition(async () => {
      const response =await AskAIAboutNoteAction(newQuestions, responses);
      setRsponses((prev) => [...prev, response]);
      setTimeout(srcollToButton,100)
    });
  };

  const srcollToButton = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const headleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      headleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={headleOnOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">Ask AI</Button>
        </DialogTrigger>
        <DialogContent
          className="scroll flex h-[85vh] max-w-4xl flex-col overflow-y-auto"
          ref={contentRef}
        >
          <DialogHeader>
            <DialogTitle>Ask AI About Your Notes</DialogTitle>
            <DialogDescription>
              Out AI Can answer questions about all of your notes
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col gap-8">
            {questions.map((question, index) => (
              <Fragment key={index}>
                <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                  {question}
                </p>
                {responses[index] && (
                  <p
                    className="bot-response text-muted-foreground text-sm"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                  />
                )}
              </Fragment>
            ))}
            {isPending && <p className="animate-spin text-sm">思考中...</p>}
          </div>
          <div
            className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
            onClick={headleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="在这里可以问AI问题"
              className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{
                minHeight: "0",
                lineHeight: "normal",
              }}
              rows={1}
              onInput={headleInput}
              
              onKeyDown={headleKeydown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button onClick={headleSubmit} className="ml-auto size-8 rounded-full cursor-pointer">
              <ArrowUpIcon className="text-background" />
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AskAIButton;
