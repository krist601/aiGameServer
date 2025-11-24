import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import { LoadPlayerSaveUseCase } from '../../../application/player/use-cases/load-player-save.use-case';
import { UpdatePlayerSaveUseCase } from '../../../application/player/use-cases/update-player-save.use-case';
import { ResetPlayerSaveUseCase } from '../../../application/player/use-cases/reset-player-save.use-case';

@Controller('player-save')
export class PlayerSaveController {
  constructor(
    private readonly loadPlayerSaveUseCase: LoadPlayerSaveUseCase,
    private readonly updatePlayerSaveUseCase: UpdatePlayerSaveUseCase,
    private readonly resetPlayerSaveUseCase: ResetPlayerSaveUseCase,
  ) {}

  @Get(':id')
  async findById(@Param('id') playerId: string): Promise<PlayerSave | null> {
    return this.loadPlayerSaveUseCase.execute(playerId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() save: Partial<PlayerSave>,
  ): Promise<PlayerSave> {
    return this.updatePlayerSaveUseCase.execute(id, save);
  }

  @Post(':id/reset')
  async reset(@Param('id') playerId: string): Promise<PlayerSave> {
    return this.resetPlayerSaveUseCase.execute(playerId);
  }
}

