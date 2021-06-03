interface RepositoryConfig {
  name: string;
  url: string;
  token?: string;
  webhookPort?: number;
  preCommands?: string[];
  startCommand?: string;
  symlinks?: any[];
}

export default RepositoryConfig;
