import { UploadFileFormStateError } from "@/schemas/upload-file-schema";
import { FileData } from "@/types/file";
import { UploadFileSchema } from "@/schemas/upload-file-schema";

export const validateFile = async (formData: FormData): Promise<UploadFileFormStateError|FileData> => {
  const validatedFields = UploadFileSchema.safeParse({
    file: formData.get('file') as File,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  return validatedFields.data;
}