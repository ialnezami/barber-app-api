import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { TimeslotsService } from '../src/timeslots/timeslots.service';
import { Role } from '../src/common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const usersService = app.get(UsersService);
  const timeslotsService = app.get(TimeslotsService);

  try {
    // Create barber user
    const hashedBarberPassword = await bcrypt.hash('barber123', 10);
    const barber = await usersService.create({
      name: 'Professional Barber',
      email: 'barber@example.com',
      password: hashedBarberPassword,
      role: Role.BARBER,
    });

    // Create customer user
    const hashedCustomerPassword = await bcrypt.hash('customer123', 10);
    const customer = await usersService.create({
      name: 'John Customer',
      email: 'customer@example.com',
      password: hashedCustomerPassword,
      role: Role.CUSTOMER,
    });

    // Create time slots for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeSlots = [
      {
        date: new Date(tomorrow).toISOString(),
        startTime: new Date(tomorrow.getTime() + 9 * 60 * 60 * 1000).toISOString(), // 9:00 AM
        endTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString(), // 10:00 AM
      },
      {
        date: new Date(tomorrow).toISOString(),
        startTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString(), // 10:00 AM
        endTime: new Date(tomorrow.getTime() + 11 * 60 * 60 * 1000).toISOString(), // 11:00 AM
      },
      {
        date: new Date(tomorrow).toISOString(),
        startTime: new Date(tomorrow.getTime() + 11 * 60 * 60 * 1000).toISOString(), // 11:00 AM
        endTime: new Date(tomorrow.getTime() + 12 * 60 * 60 * 1000).toISOString(), // 12:00 PM
      },
      {
        date: new Date(tomorrow).toISOString(),
        startTime: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000).toISOString(), // 2:00 PM
        endTime: new Date(tomorrow.getTime() + 15 * 60 * 60 * 1000).toISOString(), // 3:00 PM
      },
    ];

    for (const slot of timeSlots) {
      await timeslotsService.create(slot);
    }

    console.log('✅ Database seeded successfully');
    console.log('👨‍💼 Barber login: barber@example.com / barber123');
    console.log('👤 Customer login: customer@example.com / customer123');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await app.close();
  }
}

seed();