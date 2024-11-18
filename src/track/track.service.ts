import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getAllTracks() {
    return this.tracks;
  }
  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id) || null;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const newTrack = { id: uuidv4(), ...createTrackDto };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    const updatedTrack = { ...this.tracks[trackIndex], ...updateTrackDto };
    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  deleteTrack(id: string): boolean {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1);
    return true;
  }

  async deleteAlbumFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
