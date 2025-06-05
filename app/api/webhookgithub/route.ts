import { NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST() {
  console.log("Webhook received from GitHub");

  // Trigger git pull on the server
  exec(
    `powershell -Command "& {cd 'P:\\xampp\\htdocs\\dosxdos_web'; & 'C:\\Program Files\\Git\\cmd\\git.exe' pull}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing git pull: ${stderr}`);
        return;
      }
      console.log(`Git pull output:\n${stdout}`);
    }
  );

  return NextResponse.json({ success: true, message: "git pull triggered" });
}
