import { Injectable, Logger } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repository';
import { RedisService } from 'nestjs-redis';
import { PathRepository } from '../repositories/path.repository';
import Web3 from 'web3';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { Envelope } from '@envelope';

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
    private readonly logger: Logger,
    private readonly envelope: Envelope
  ) {
    this.logger.setContext('ApiService');
  }

  async getContract() {}

  async getState(variable) {
    const web3 = new Web3(this.configService.get<string>('WEB3_PROVIDER_URI'));
    const networkId = this.configService.get<string>('NETWORK_ID');
    const contractAddress = networks[networkId].address;
    const contract = new web3.eth.Contract(abi, contractAddress);
    this.logger.log(`Getting state on contract address: ${contractAddress}`);
    return await contract.methods[variable]().call();
  }

  async changeState(action, value) {
    const web3 = new Web3(this.configService.get<string>('WEB3_PROVIDER_URI'));
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const networkId = await web3.eth.net.getId();
    const contractAddress = networks[networkId].address;
    this.logger.log(`Changing state on contract address: ${contractAddress}`);
    const contract = new web3.eth.Contract(abi, contractAddress);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const { address } = account;
    let estimatedGas = await contract.methods[action](value).estimateGas();
    let data = contract.methods[action](value).encodeABI();
    let setPublicValueTx = {
      from: address,
      to: contractAddress,
      gasLimit: estimatedGas,
      data,
      chainId: 7,
    };
    switch (action) {
      case 'algo':
        break;
      default:
        const signedTx = await account.signTransaction(setPublicValueTx);
        const result = await web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );
        return result;
        break;
    }
    return address;
  }

  async storeValue(value): Promise<any> {
    return this.changeState('set', value);
  }

  async getValue(variable): Promise<any> {
    return this.getState(variable);
  }

  async askForNumber(seed: string): Promise<any> {
    return this.envelope.wrapNumber(seed);
  }
}
