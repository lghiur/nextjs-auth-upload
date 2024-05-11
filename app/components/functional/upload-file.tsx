'use client'
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';
import { uploadFile } from "@/actions/upload";
import { SubmitButton } from "@/app/components/functional/submit-button";

export function UploadFile() {
  const router = useRouter();
  const [state, action] = useFormState(uploadFile, undefined);
  return <form action={async (event) => {
    await action(event);
    router.refresh();
  }}>
    <div>
      <label htmlFor="file">File</label>
      <input id="file" name="file" type="file" />
      <input id="file" name="aaa" type="text" />
    </div>
    {state?.errors?.file?.length ? <p>{JSON.stringify(state.errors.file)}</p> : null}
    <SubmitButton btnName="Upload" />
  </form>
}
