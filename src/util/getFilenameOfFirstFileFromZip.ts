import StreamZip from 'node-stream-zip';

async function getFilenameOfFirstFileFromZip(zipPath: string): Promise<string> {
  // eslint-disable-next-line new-cap
  const zip = new StreamZip.async({ file: zipPath });
  try {
    const entries = await zip.entries();
    const result = Object.values(entries)[0].name.replace('/', '');
    return result;
  } finally {
    zip.close();
  }
}

export default getFilenameOfFirstFileFromZip;
