"use server";

export default async function RemoveBackgroundAction(file: FormData): Promise<{
  error: boolean;
  noBackgroundImage?: string;
}> {
  try {
    const apiKey = process.env.CLIP_DROP_API_KEY;
    if (!apiKey) {
      return { error: true };
    }

    const response = await fetch(
      "https://clipdrop-api.co/remove-background/v1",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: file,
        redirect: "follow",
      },
    );

    if (response.ok) {
      const noBackgroundBlob = await response.blob();
      const arrayBuffer = await noBackgroundBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const noBackgroundImageBase64 = `data:${noBackgroundBlob.type};base64,${buffer.toString("base64")}`;

      return {
        error: false,
        noBackgroundImage: noBackgroundImageBase64,
      };
    }

    return { error: true };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}
