import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repository';
import { Route } from '../domain/routes.schema';
import { RedisService } from 'nestjs-redis';
import { Path } from '../domain/path.schema';
import { PathRepository } from '../repositories/path.repository';
import Web3 from 'web3'
import * as fs from 'fs'
import * as path from 'path'
import { ConfigService } from '@nestjs/config';
// @ts-ignore
const { abi, networks } = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/contracts/TestContract.json')))
console.log(abi);
console.log(networks);

@Injectable()
export class ApiService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly pathRepository: PathRepository,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}

  async changeState(value){
    const privateKey = this.configService.get<string>('PRIVATE_KEY')
    console.log(privateKey);
    return value
  }

  async storeValue(value):Promise<string> {
    return this.changeState(value)
  }

}
