import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException(`Artist with ID ${id} not found`);
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
      return artist;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Artist with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.track.updateMany({
          where: { artistId: id },
          data: { artistId: null },
        });
        await prisma.album.updateMany({
          where: { artistId: id },
          data: { artistId: null },
        });
        await prisma.artist.delete({ where: { id } });
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Artist with ID ${id} not found`);
      }
      throw error;
    }
  }
}
