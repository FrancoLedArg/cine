"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { UploadButton } from "@/components/uploadthing";
import { get } from "react-hook-form";
import { useState } from "react";

export default function ImageUploadField({
  name,
  label,
  disabled,
}: {
  name: string;
  label: string;
  disabled?: boolean;
}) {
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const imageUrl = useWatch({ name });
  const error = get(errors, name)?.message as string | undefined;
  const [isUploading, setIsUploading] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <div className="space-y-2">
        <UploadButton
          endpoint="imageUploader"
          onUploadBegin={() => {
            setIsUploading(true);
          }}
          onClientUploadComplete={(res) => {
            if (res && res[0]?.url) {
              setValue(name, res[0].url);
              trigger(name);
            }
            setIsUploading(false);
          }}
          onUploadError={(error) => {
            console.error("Upload error:", error);
            setIsUploading(false);
          }}
          disabled={disabled || isUploading}
        />
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-32 w-auto rounded-md border object-cover"
            />
          </div>
        )}
      </div>
      {error && <FieldError errors={[{ message: error as string }]} />}
    </Field>
  );
}

