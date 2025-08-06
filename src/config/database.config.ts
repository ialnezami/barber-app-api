import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService) => ({
  uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/barber_rdv',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});