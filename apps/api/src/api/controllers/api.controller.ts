import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiService } from '../services/api.service';
import { SeedNumber, Value, Variable } from '../validators/validator';

@Controller('luckyseven')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('ask-for-number')
  askForNumber(@Query() params: SeedNumber) {
    return this.apiService.askForNumber(params.seed);
  }

  @Post('store-value')
  storeValue(@Body() body: Value) {
    return this.apiService.storeValue(body.value);
  }

  @Get('get-value')
  shortestPath(@Query() params: Variable) {
    return this.apiService.getValue(params.variable);
  }
}
