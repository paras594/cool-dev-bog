// format date
export function formatDate() {
  const date = new Date();
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function fileObjToBase64(img) {
  const bytes = await img.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Data = buffer.toString("base64");

  return `data:image/png;base64,${base64Data}`;
}
