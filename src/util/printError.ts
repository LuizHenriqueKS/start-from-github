function printError(error: Error) {
  const obj: any = error;
  if ((obj.code && obj.code === 'ENOENT') || (obj.name && obj.name === 'FileNotFoundError')) {
    console.error(`File not found: ${obj.path}`);
  } else {
    console.error(error);
  }
}

export default printError;
