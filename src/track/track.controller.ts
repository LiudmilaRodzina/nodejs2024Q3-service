import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks() {
    return await this.trackService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.getTrackById(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }

  @DeleteWithNoContent(':id')
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.deleteTrack(id);
  }
}
