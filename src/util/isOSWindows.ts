function isOSWindows(): boolean {
  return process.platform.toLowerCase().includes('win');
}

export default isOSWindows;
