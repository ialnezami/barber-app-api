import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';

@Injectable()
export class TimeslotsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeslotDto: CreateTimeslotDto) {
    return this.prisma.timeSlot.create({
      data: {
        date: new Date(createTimeslotDto.date),
        startTime: new Date(createTimeslotDto.startTime),
        endTime: new Date(createTimeslotDto.endTime),
      },
    });
  }

  async findAll() {
    return this.prisma.timeSlot.findMany({
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findAvailable() {
    return this.prisma.timeSlot.findMany({
      where: {
        isBooked: false,
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async remove(id: number) {
    return this.prisma.timeSlot.delete({
      where: { id },
    });
  }
}