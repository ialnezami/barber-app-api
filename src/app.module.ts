import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TimeslotsModule } from './timeslots/timeslots.module';

@Module({
  imports: [AuthModule, UsersModule, AppointmentsModule, TimeslotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
