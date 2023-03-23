import { Injectable, LogLevel, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appendFileSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const DEFAULT_LOG_FILE_SIZE = 5;

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logLevel: number;

  constructor(private readonly configService: ConfigService) {
    super();
    const currentLevel = this.configService.get<LogLevel>('LOG_LEVEL');
    this.logLevel = logLevels.indexOf(currentLevel);
  }

  error(message: any, ...optionalParams: any[]) {
    this.makeLog('error', message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.makeLog('warn', message, optionalParams);
  }
  log(message: any, ...optionalParams: any[]) {
    this.makeLog('log', message, optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    this.makeLog('debug', message, optionalParams);
  }
  verbose(message: any, ...optionalParams: any[]) {
    this.makeLog('verbose', message, optionalParams);
  }

  makeLog(level: LogLevel, message: any, ...optionalParams: any[]) {
    const levelMethod = logLevels.indexOf(level);

    if (levelMethod > this.logLevel) return;

    super[level](message);

    const logLine =
      `[${level.toUpperCase()}]: ${message} ${optionalParams.join(' ')}` + '\n';

    // process.stdout.write(logLine);

    this.writeToFile(level, logLine);
  }

  writeToFile(level: LogLevel, message: string) {
    const fileName = level === 'error' ? 'error.log' : 'app.log';
    const filePath = join('.', 'logs', fileName);
    const dirName = dirname(filePath);

    try {
      const stats = statSync(filePath);
      const fileSize = stats.size / 1024;

      const maxFileSize =
        Number(this.configService.get<number>('MAX_LOG_FILE_SIZE')) ||
        DEFAULT_LOG_FILE_SIZE;

      if (fileSize > maxFileSize) {
        const newFilePath = join(dirName, `${Date.now()} - ${fileName}`);
        renameSync(filePath, newFilePath);
      }
    } catch (error) {}

    mkdirSync(dirName, { recursive: true });
    appendFileSync(filePath, message);
  }
}
