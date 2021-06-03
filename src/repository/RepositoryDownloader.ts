import CommandArgs from '../cmd/CommandArgs';
import RepositoryConfig from '../model/RepositoryConfig';
import deleteDownloadedRepository from './deleteDownloadedRepository';
import loadRepositoryConfig from './loadRepositoryConfig';
import requestOnlineRepositoryVersion from './requestOnlineRepositoryVersion';
import writeRepositoryVersion from './writeRepositoryVersion';
import loadRepositoryVersion from './loadRepositoryVersion';
import RepositoryVersion from '../model/RepositoryVersion';
import getRepositoryData from './getRepositoryData';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import tmp from 'tmp';
import createDirectoryIfNotExists from '../util/createDirectoryIfNotExists';
import waitDownloadToFinish from '../util/waitDownloadToFinish';
import getFilenameOfFirstFileFromZip from '../util/getFilenameOfFirstFileFromZip';
import unzipFiles from '../util/unzipFiles';
import RepositoryVersionStatus from '../model/RepositoryVersionStatus';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';

class RepositoryDownloader {
  readonly args: CommandArgs;
  readonly filename: string;

  constructor(args: CommandArgs, filename?: string) {
    this.args = args;
    this.filename = filename || 'repository.json';
  }

  async download(): Promise<void> {
    const repositoryConfig = loadRepositoryConfig(this.args, this.filename);
    const repositoryVersion = await requestOnlineRepositoryVersion(repositoryConfig);
    const downloadedRepositoryVersion = loadRepositoryVersion(this.args, repositoryConfig);
    const repositoryVersionStatus = this.getRepositoryVersionStatus(repositoryVersion, downloadedRepositoryVersion);
    if (RepositoryVersionStatus.UP_TO_DATE === repositoryVersionStatus) {
      console.info(`The local files of '${repositoryConfig.name}' is up to date.`);
    } else {
      this.printRepositoryVersionStatus(repositoryConfig, repositoryVersionStatus);
      await this.deleteDownloadedRepositoryIfExists(downloadedRepositoryVersion);
      await this.downloadLatestVersion(repositoryConfig, repositoryVersion);
      writeRepositoryVersion(this.args.directory, repositoryVersion);
    }
  }

  private getRepositoryVersionStatus(repositoryVersion: RepositoryVersion, downloadedRepositoryVersion?: RepositoryVersion): RepositoryVersionStatus {
    if (!downloadedRepositoryVersion) {
      return RepositoryVersionStatus.FILE_VERSION_NOT_FOUND;
    } else if (downloadedRepositoryVersion && downloadedRepositoryVersion.updatedAt !== repositoryVersion.updatedAt) {
      return RepositoryVersionStatus.OUTDATED;
    } else if (!fs.existsSync(this.getRepositoryDirectory(downloadedRepositoryVersion!))) {
      return RepositoryVersionStatus.DIRECTORY_NOT_FOUND;
    } else {
      return RepositoryVersionStatus.UP_TO_DATE;
    }
  }

  private getRepositoryDirectory(repositoryVersion: RepositoryVersion): string {
    return getDownloadedRepositoryDir(this.args.directory, repositoryVersion);
  }

  private printRepositoryVersionStatus(repositoryConfig: RepositoryConfig, repositoryVersionStatus: RepositoryVersionStatus) {
    switch (repositoryVersionStatus) {
      case RepositoryVersionStatus.OUTDATED:
        console.info(`The local version of '${repositoryConfig.name}' is outdated.`);
        break;
      case RepositoryVersionStatus.FILE_VERSION_NOT_FOUND:
        console.log(`This repository hasn't been downloaded yet: '${repositoryConfig.name}'`);
        break;
      case RepositoryVersionStatus.DIRECTORY_NOT_FOUND:
        console.log(`The local directory of '${repositoryConfig.name}' wasn't found.`);
        break;
    }
  }

  private async downloadLatestVersion(repositoryConfig: RepositoryConfig, repositoryVersion: RepositoryVersion): Promise<void> {
    const repositoryData = getRepositoryData(repositoryConfig.url);
    const repositoryDirectory = path.join(this.args.directory, 'repositories');
    const url = `https://api.github.com/repos/${repositoryData.user}/${repositoryData.name}/zipball`;

    console.log(`Download latest version from '${repositoryConfig.name}'...`);
    const downloadedZipPath = await this.downloadBallZip(url, repositoryConfig.token);

    console.log('Extracting files...');
    createDirectoryIfNotExists(repositoryDirectory);
    await unzipFiles(downloadedZipPath, repositoryDirectory);
    repositoryVersion.dirname = await getFilenameOfFirstFileFromZip(downloadedZipPath);

    fs.unlinkSync(downloadedZipPath);
  }

  private async downloadBallZip(url: string, token?: string): Promise<string> {
    const tmpZipFile = tmp.fileSync({ postfix: '.zip' });
    const writer = fs.createWriteStream(tmpZipFile.name);
    const headers = this.buildHeaders(token);
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        headers
      });
      response.data.pipe(writer);
      await waitDownloadToFinish(writer);
      return tmpZipFile.name;
    } finally {
      writer.close();
    }
  }

  private buildHeaders(token?: string): any {
    const headers: any = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }
    return headers;
  }

  private async deleteDownloadedRepositoryIfExists(downloadedRepositoryVersion?: RepositoryVersion) {
    if (downloadedRepositoryVersion) {
      await deleteDownloadedRepository(this.args.directory, downloadedRepositoryVersion);
    }
  }
}

export default RepositoryDownloader;
