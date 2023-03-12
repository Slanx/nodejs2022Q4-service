import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('This track does not exist');
    }

    return track;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('This track does not exist');
    }

    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException('This track does not exist');
    }

    await this.tracksService.remove(track);
  }
}
