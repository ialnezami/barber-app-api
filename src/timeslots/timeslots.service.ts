import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSlot } from './schemas/timeslot.schema';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';

@Injectable()
export class TimeslotsService {
  constructor(
    @InjectModel(TimeSlot.name)
    private timeSlotModel: Model<TimeSlot>,
  ) {}

  async create(createTimeslotDto: CreateTimeslotDto): Promise<TimeSlot> {
    const timeSlot = new this.timeSlotModel({
      date: new Date(createTimeslotDto.date),
      startTime: new Date(createTimeslotDto.startTime),
      endTime: new Date(createTimeslotDto.endTime),
    });
    return timeSlot.save();
  }

  async findAll(): Promise<TimeSlot[]> {
    return this.timeSlotModel.find().sort({ date: 1 }).exec();
  }

  async findAvailable(): Promise<TimeSlot[]> {
    return this.timeSlotModel
      .find({
        isBooked: false,
        date: { $gte: new Date() },
      })
      .sort({ date: 1 })
      .exec();
  }

  async findById(id: string): Promise<TimeSlot | null> {
    return this.timeSlotModel.findById(id).exec();
  }

  async remove(id: string): Promise<TimeSlot | null> {
    return this.timeSlotModel.findByIdAndDelete(id).exec();
  }

  async bookSlot(id: string, userId: string): Promise<TimeSlot | null> {
    return this.timeSlotModel
      .findByIdAndUpdate(
        id,
        { isBooked: true, bookedBy: userId },
        { new: true }
      )
      .exec();
  }
}