import { Injectable } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Injectable()
export class AppService {
  getHealthStatus() {
    return { status: 'ok', timestamp: new Date()};
  }
}
