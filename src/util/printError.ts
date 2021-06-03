function printError(error: Error) {
  const obj: any = error;
  if (obj.code && obj.code === 'ENOENT') {
    console.error(`File not found: ${obj.path}`);
  } else {
    console.error(error);
  }
}

export default printError;
