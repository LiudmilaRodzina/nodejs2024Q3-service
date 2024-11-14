import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private tracks = [];

  getAllTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = { id: uuidv4(), ...createTrackDto };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    const updatedTrack = { ...this.tracks[trackIndex], ...updateTrackDto };
    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    this.tracks.splice(trackIndex, 1);
    return true;
  }

  async nullifyAlbumId(albumId: string): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
