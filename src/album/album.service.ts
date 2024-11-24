import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException(`Album with ID ${id} not found`);
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
      return album;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Album with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteArtistFromAlbums(artistId: string) {
    await this.prisma.album.updateMany({
      where: { artistId: artistId },
      data: { artistId: null },
    });
  }
}
