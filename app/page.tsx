import { LogoutButton } from "./components/functional/logout-button";
import { UploadFile } from "./components/functional/upload-file";
import { Files } from "./components/functional/list-files";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadFile />
      <Files />
      <LogoutButton />
    </main>
  );
}
