import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string): Promise<Appointment> {
    const appointment = new this.appointmentModel({
      ...createAppointmentDto,
      date: new Date(createAppointmentDto.date),
      userId,
    });
    return appointment.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel
      .find()
      .populate('userId', 'name email')
      .sort({ date: 1 })
      .exec();
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    return this.appointmentModel
      .find({ userId })
      .populate('userId', 'name email')
      .sort({ date: 1 })
      .exec();
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('userId', 'name email')
      .exec();
    
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    
    return appointment;
  }

  async remove(id: string, userId: string, userRole: string): Promise<Appointment> {
    const appointment = await this.findById(id);

    // Only allow the owner or barber to cancel
    if (appointment.userId.toString() !== userId && userRole !== 'BARBER') {
      throw new ForbiddenException('You can only cancel your own appointments');
    }

    const deletedAppointment = await this.appointmentModel.findByIdAndDelete(id).populate('userId', 'name email').exec();

    if (!deletedAppointment) {
      throw new NotFoundException('Appointment not found');
    }

    return deletedAppointment;
  }

  async update(id: string, updateData: any, userId: string, userRole: string): Promise<Appointment> {
    const appointment = await this.findById(id);

    if (appointment.userId.toString() !== userId && userRole !== 'BARBER') {
      throw new ForbiddenException('You can only update your own appointments');
    }

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'name email')
      .exec();

    if (!updatedAppointment) {
      throw new NotFoundException('Appointment not found');
    }

    return updatedAppointment;
  }
}