import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';
import { validate as isUuid } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.updateTrack(
      id,
      updateTrackDto,
    );
    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return updatedTrack;
  }

  @DeleteWithNoContent(':id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const isTrackDeleted = await this.trackService.deleteTrack(id);
    if (!isTrackDeleted) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
  }
}
