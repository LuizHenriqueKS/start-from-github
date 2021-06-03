interface RepositoryConfig {
  name: string;
  url: string;
  token?: string;
  webhookPort?: number;
  preCommands?: string[];
  startCommand?: string;
  symlink?: any[];
}

export default RepositoryConfig;
