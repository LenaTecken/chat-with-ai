import React from "react";

import { cn } from "@/lib/utils";

import { Textarea, TextareaProps } from "../ui/textarea";

interface Props extends TextareaProps {
  id: string;
  name: string;
  disabled?: boolean;
  error?: string;
}

function FormTextAreaInput({
  id,
  name,
  error,
  disabled,
  placeholder,
  ...props
}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <Textarea
        id={id}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
        className={cn(
          "rounded-2xl flex-1 resize-none bg-secondary pr-12 text-foreground placeholder:text-foreground/60",
          { "border-destructive": !!error }
        )}
      />
      <div className="h-6">
        {!!error && <span className="text-xs text-destructive">{error}</span>}
      </div>
    </div>
  );
}

export default FormTextAreaInput;
