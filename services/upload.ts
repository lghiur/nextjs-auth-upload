import path from "path";
import fs from "fs";
import prisma from '@/lib/prisma';
import { FileData, FileMetadata } from "@/types/file";

const extractMetadata = (fileData: FileData): FileMetadata => {
  const { file } = fileData;
  const fileName = file?.name;
  const extension = fileName?.split(".").pop();
  let imageName = `${Date.now()}.${extension ?? "jpg"}`;
  const imagePath = path.join(`./public/uploads/`, imageName);

  return {
    name: imageName,
    path: imagePath,
  };
};

export async function storeFile (fileMetadata: FileMetadata) {
  try {
    const file = await prisma.file.create({
      data: {
        name: fileMetadata.name,
        path: fileMetadata.path,
      },
    });
  
    return file;
  } catch(error) {
    throw new Error('An error occurred while storing your file.');
  }
}

export async function uploadFile (fileData: FileData) {
  const { file } = fileData;
  const { name, path } = extractMetadata(fileData);
  console.log(name, path);
  try {
    await storeFile({ name, path });

    const imageStream = fs.createWriteStream(path);
    imageStream.write(Buffer.from(await file.arrayBuffer()));
    imageStream.end();
  } catch(error) {
    throw new Error('An error occurred while uploading your file.');
  }
};

export async function getFiles(): Promise<FileMetadata[]>{
  try {
    const files = await prisma.file.findMany();
    return files.map((file) => ({
      name: file.name,
      path: file.path.replace('public/', ''),
    }));
  } catch(error) {
    throw new Error('An error occurred while fetching files.');
  }
}

