import StreamZip from 'node-stream-zip';

async function unzipFiles(zipPath: string, outDirectory: string) {
  // eslint-disable-next-line new-cap
  const zip = new StreamZip.async({ file: zipPath });
  try {
    await zip.extract(null, outDirectory);
  } finally {
    zip.close();
  }
}

export default unzipFiles;
