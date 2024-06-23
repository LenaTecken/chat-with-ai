import React from "react";

import { cn } from "@/lib/utils";

import { Textarea, TextareaProps } from "../ui/textarea";

interface Props extends TextareaProps {
  id: string;
  name: string;
  disabled?: boolean;
  errors?: any;
}

function FormTextAreaInput({
  id,
  name,
  errors,
  disabled,
  placeholder,
  ...props
}: Props) {
  const inputErr: string[] = errors?.[id]?._errors ?? [];

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
          { "border-destructive": inputErr.length }
        )}
      />
      {!!inputErr.length ? (
        <div className="text-destructive">
          {inputErr.map((error, k) => (
            <span key={`err-${id}-${k}`} className="text-xs">
              {error}
            </span>
          ))}
        </div>
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
}

export default FormTextAreaInput;
