"use client";

import { useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { get } from "react-hook-form";

export default function TextareaField({
  name,
  label,
  disabled,
  rows,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  rows?: number;
}) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name)?.message as string | undefined;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        id={name}
        placeholder={label}
        disabled={disabled}
        rows={rows || 4}
        {...register(name, {
          onChange: async () => {
            await trigger(name);
          },
        })}
      />
      {error && <FieldError errors={[{ message: error as string }]} />}
    </Field>
  );
}

