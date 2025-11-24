import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CanonicalEvent } from '../../../domain/canonical-event/canonical-event.entity';
import type { PlayerSave } from '../../../domain/player/player-save.entity';
import { CreateCanonicalEventUseCase } from '../../../application/canonical-event/use-cases/create-canonical-event.use-case';
import { TriggerCanonicalEventUseCase } from '../../../application/canonical-event/use-cases/trigger-canonical-event.use-case';
import { GetCanonicalProgressUseCase } from '../../../application/canonical-event/use-cases/get-canonical-progress.use-case';

@Controller('canonical-event')
export class CanonicalEventController {
  constructor(
    private readonly createCanonicalEventUseCase: CreateCanonicalEventUseCase,
    private readonly triggerCanonicalEventUseCase: TriggerCanonicalEventUseCase,
    private readonly getCanonicalProgressUseCase: GetCanonicalProgressUseCase,
  ) {}

  @Post()
  async create(@Body() event: CanonicalEvent): Promise<CanonicalEvent> {
    return this.createCanonicalEventUseCase.execute(event);
  }

  @Post('trigger/:id')
  async trigger(
    @Param('id') eventId: string,
    @Body() body: { player_id: string },
  ): Promise<{ event: CanonicalEvent; playerSave: PlayerSave }> {
    return this.triggerCanonicalEventUseCase.execute(eventId, body.player_id);
  }

  @Get('progress/:playerId')
  async getProgress(@Param('playerId') playerId: string): Promise<{
    events: CanonicalEvent[];
    unlocked: string[];
    progress: number;
  }> {
    return this.getCanonicalProgressUseCase.execute(playerId);
  }
}

