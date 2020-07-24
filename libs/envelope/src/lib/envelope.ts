import * as crypto from 'crypto';

export class Envelope {
  constructor() {}

  wrapNumber(number: string): string {
    return crypto.createHash('sha256').update(number).digest('base64');
  }

  checkNumberWrap(digest: string, number: string): boolean {
    return (
      crypto.createHash('sha256').update(number).digest('base64') === digest
    );
  }
}
