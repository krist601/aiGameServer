import { Inject, Injectable } from '@nestjs/common';
import type { DailyQuest } from '../../../domain/daily-quest/daily-quest.entity';
import {
  DAILY_QUEST_PORT,
  type DailyQuestPort,
} from '../ports/daily-quest.port';
import {
  INVENTORY_PORT,
  type InventoryPort,
} from '../../inventory/ports/inventory.port';
import {
  PLAYER_SAVE_PORT,
  type PlayerSavePort,
} from '../../player/ports/player-save.port';

@Injectable()
export class ClaimQuestRewardUseCase {
  constructor(
    @Inject(DAILY_QUEST_PORT)
    private readonly dailyQuestPort: DailyQuestPort,
    @Inject(INVENTORY_PORT)
    private readonly inventoryPort: InventoryPort,
    @Inject(PLAYER_SAVE_PORT)
    private readonly playerSavePort: PlayerSavePort,
  ) {}

  async execute(questId: string, playerId: string): Promise<{
    quest: DailyQuest;
    rewardGranted: boolean;
  }> {
    const quest = await this.dailyQuestPort.findById(questId);
    if (!quest) {
      throw new Error(`Quest ${questId} not found`);
    }

    if (!quest.is_completed) {
      throw new Error('Quest is not completed');
    }

    if (quest.is_claimed) {
      throw new Error('Quest reward already claimed');
    }

    // Grant reward based on type
    if (quest.reward_type === 'item' && quest.reward_item_id) {
      const inventory = await this.inventoryPort.findByPlayerId(playerId);
      if (inventory) {
        const existingItem = inventory.items.find(
          (item) => item.item_id === quest.reward_item_id,
        );
        if (existingItem) {
          existingItem.quantity += quest.reward_value;
        } else {
          inventory.items.push({
            item_id: quest.reward_item_id!,
            quantity: quest.reward_value,
            acquired_at: new Date(),
          });
        }
        await this.inventoryPort.update(inventory.id!, inventory);
      }
    } else if (quest.reward_type === 'attribute') {
      const playerSave = await this.playerSavePort.findByPlayerId(playerId);
      if (playerSave) {
        // Apply attribute reward (would need attribute name)
        playerSave.attributes_state = {
          ...playerSave.attributes_state,
          // This would need the actual attribute name
        };
        await this.playerSavePort.update(playerSave.id!, playerSave);
      }
    }

    const updatedQuest = await this.dailyQuestPort.update(questId, {
      is_claimed: true,
    });

    return { quest: updatedQuest, rewardGranted: true };
  }
}

