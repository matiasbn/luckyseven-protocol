import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repository';
import { Route } from '../domain/routes.schema';
import { RedisService } from 'nestjs-redis';
import { Path } from '../domain/path.schema';
import { PathRepository } from '../repositories/path.repository';
import Web3 from 'web3';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const { abi, networks } = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    path.resolve(__dirname, './assets/contracts/TestContract.json')
  )
);

@Injectable()
export class ApiService {
  constructor(
    private readonly routeRepository: RouteRepository,
    private readonly pathRepository: PathRepository,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly logger: Logger
  ) {
    this.logger.setContext('ApiService');
  }
  async changeState(action, value = null) {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const web3 = new Web3(this.configService.get<string>('WEB3_PROVIDER_URI'));
    const networkId = await web3.eth.net.getId();
    const contractAddress = networks[networkId].address;
    this.logger.log(`Changing state on contract address: ${contractAddress}`);
    const simpleContract = new web3.eth.Contract(abi, contractAddress);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const { address } = account;
    let estimatedGas = await simpleContract.methods.set(value).estimateGas();
    let data = simpleContract.methods.set(value).encodeABI();
    let setPublicValueTx = {
      from: address,
      to: contractAddress,
      gasLimit: estimatedGas,
      data,
      chainId: 7,
    };
    console.log(setPublicValueTx);
    switch (action) {
      case 'set':
        const signedTx = await account.signTransaction(setPublicValueTx);
        const result = await web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );
        return result;
        break;
      default:
        break;
    }
    return address;
  }

  async storeValue(value): Promise<any> {
    return this.changeState('set', value);
  }
}
