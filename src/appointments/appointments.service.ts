import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number) {
    return this.prisma.appointment.create({
      data: {
        date: new Date(createAppointmentDto.date),
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async remove(id: number, userId: number, userRole: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Only allow the owner or barber to cancel
    if (appointment.userId !== userId && userRole !== 'BARBER') {
      throw new ForbiddenException('You can only cancel your own appointments');
    }

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}