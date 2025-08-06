import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TimeslotsService } from './timeslots.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Time Slots')
@Controller('timeslots')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TimeslotsController {
  constructor(private timeslotsService: TimeslotsService) {}

  @Post()
  @Roles(Role.BARBER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new time slot (Barber only)' })
  @ApiResponse({ status: 201, description: 'Time slot created successfully' })
  async create(@Body() createTimeslotDto: CreateTimeslotDto) {
    return this.timeslotsService.create(createTimeslotDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all time slots' })
  @ApiResponse({ status: 200, description: 'Time slots retrieved successfully' })
  async findAll() {
    return this.timeslotsService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available time slots' })
  @ApiResponse({ status: 200, description: 'Available time slots retrieved successfully' })
  async findAvailable() {
    return this.timeslotsService.findAvailable();
  }

  @Delete(':id')
  @Roles(Role.BARBER)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a time slot (Barber only)' })
  @ApiResponse({ status: 200, description: 'Time slot deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.timeslotsService.remove(+id);
  }
}