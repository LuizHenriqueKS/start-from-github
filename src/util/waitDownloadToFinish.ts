function waitDownloadToFinish(writer) {
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

export default waitDownloadToFinish;
