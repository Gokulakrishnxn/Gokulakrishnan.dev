"use client";

import { CopyIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Variable {
  name: string;
  value: string;
}

interface AIPromptBuilderProps {
  template?: string;
  variables?: Variable[];
  onCopy?: (prompt: string) => void;
  className?: string;
}

export function AIPromptBuilder({
  template = "You are a helpful assistant. User question: {{question}}",
  variables: initialVariables = [{ name: "question", value: "" }],
  onCopy,
  className,
}: AIPromptBuilderProps) {
  const [templateText, setTemplateText] = useState(template);
  const [variables, setVariables] = useState<Variable[]>(initialVariables);
  const [copied, setCopied] = useState(false);

  const buildPrompt = () => {
    let prompt = templateText;
    variables.forEach((variable) => {
      const regex = new RegExp(`\\{\\{${variable.name}\\}\\}`, "g");
      prompt = prompt.replace(regex, variable.value);
    });
    return prompt;
  };

  const handleCopy = () => {
    const finalPrompt = buildPrompt();
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) {
      onCopy(finalPrompt);
    }
  };

  const updateVariable = (index: number, value: string) => {
    const updated = [...variables];
    updated[index].value = value;
    setVariables(updated);
  };

  const addVariable = () => {
    const newVarName = `variable${variables.length + 1}`;
    setVariables([...variables, { name: newVarName, value: "" }]);
    setTemplateText(`${templateText} {{${newVarName}}}`);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-muted-foreground" />
          <label className="text-sm font-medium">Prompt Template</label>
        </div>
        <Textarea
          value={templateText}
          onChange={(e) => setTemplateText(e.target.value)}
          placeholder="Enter your prompt template. Use {{variableName}} for variables."
          className="min-h-24 font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Use <code className="rounded bg-muted px-1 py-0.5">{"{{variableName}}"}</code> to
          create variables
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Variables</label>
          <Button
            variant="outline"
            size="sm"
            onClick={addVariable}
            className="h-7 text-xs"
          >
            Add Variable
          </Button>
        </div>
        <div className="space-y-2">
          {variables.map((variable, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">
                  {variable.name}
                </label>
                <Textarea
                  value={variable.value}
                  onChange={(e) => updateVariable(index, e.target.value)}
                  placeholder={`Enter value for ${variable.name}`}
                  className="min-h-16 font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Final Prompt</label>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-7 gap-1.5"
          >
            <CopyIcon className="size-3" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <div className="rounded-lg border border-edge bg-muted p-4">
          <pre className="text-sm font-mono whitespace-pre-wrap break-words text-foreground">
            {buildPrompt()}
          </pre>
        </div>
      </div>
    </div>
  );
}

