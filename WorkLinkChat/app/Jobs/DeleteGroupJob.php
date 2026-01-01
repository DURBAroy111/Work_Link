<?php

namespace App\Jobs;

use App\Events\GroupDeleted;
use App\Models\Group;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteGroupJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $groupId;

    public function __construct(int $groupId)
    {
        $this->groupId = $groupId;
    }

    public function handle(): void
    {
        $group = Group::find($this->groupId);

        // ✅ Group already deleted → do nothing
        if (!$group) {
            return;
        }

        // ✅ Broadcast BEFORE delete
        broadcast(new GroupDeleted($group->id, $group->name));

        // ✅ Detach users safely
        $group->users()->detach();

        // ✅ Delete group
        $group->forceDelete();
    }
}
