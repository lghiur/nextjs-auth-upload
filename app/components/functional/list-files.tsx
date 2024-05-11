import { getFiles } from '@/services/upload';
import { FileMetadata } from '@/types/file';

export async function Files() {
  const files = await getFiles();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Files</h1>
      <ul className="flex flex-col items-center">
        {files.map((file: FileMetadata) => (
          <li key={file.name} className="flex items-center justify-between w-1/4 p-4 border border-gray-300">
            <span>{file.name}</span>
            <a href={file.path} target='_blank' className="bg-blue-500 text-white p-2 rounded">Download</a>
          </li>
        ))}
      </ul>
    </div>
  )
}