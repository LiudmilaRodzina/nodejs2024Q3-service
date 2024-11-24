import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException(`Track with ID ${id} not found`);
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
      return track;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Track with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Track with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteAlbumFromTracks(albumId: string) {
    await this.prisma.track.updateMany({
      where: { albumId: albumId },
      data: { albumId: null },
    });
  }
}
