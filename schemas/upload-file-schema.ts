import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export const UploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((files) => {
      return Boolean(files), "Image is required.";
    })
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      ".jpg, .jpeg, .png and .pdf files are accepted."
    ),
});

export type UploadFileFormStateError = {
  errors?: {
    file?: string[]
  }
  message?: string
}

export type UploadFileFormState = 
  | UploadFileFormStateError
  | undefined;