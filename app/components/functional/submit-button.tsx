import { useFormStatus } from 'react-dom'
 
export function SubmitButton({
  btnName
}: { btnName: string }) {
  const { pending } = useFormStatus();
 
  return (
    <button aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : btnName}
    </button>
  )
};
