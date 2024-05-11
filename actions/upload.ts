"use server"
import { UploadFileFormStateError, UploadFileFormState } from "@/schemas/upload-file-schema";
import { uploadFile as uploadFileService } from "@/services/upload";
import { validateFile } from "@/services/file-upload-validation";
import { FileData } from "@/types/file";

export async function uploadFile(state: UploadFileFormState, formData: FormData) {
  try {
    const validateFileData = await validateFile(formData);

    if ((validateFileData as UploadFileFormStateError)?.errors) {
      console.log('validateFileData', validateFileData);
      return {
        errors: (validateFileData as UploadFileFormStateError).errors,
      };
    }

    await uploadFileService(validateFileData as FileData);

    return {
      message: 'File uploaded successfully',
    };
  } catch (error) {
    return {
      errors: ['An error occurred while uploading the file. Please try again.'],
    };
  }
}
