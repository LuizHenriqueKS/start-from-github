function waitDownloadToFinish(writer: any) {
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

export default waitDownloadToFinish;
