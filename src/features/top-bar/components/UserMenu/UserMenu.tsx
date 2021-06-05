import React from 'react';
import { UserMenuTriggerButton } from './TriggerButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemLink,
  DropdownMenuItemRightSlot,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/dropdown-menu';
import { Icon } from '@/components/icon';
import { Text } from '@/components/text';

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserMenuTriggerButton />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={10}
        align="end"
        css={{
          // Match spotify styles
          minWidth: '196px',
        }}
      >
        <DropdownMenuItemLink href="https://www.spotify.com/us/account/overview/" external>
          Account
          <DropdownMenuItemRightSlot>
            <Icon name="external-link" />
          </DropdownMenuItemRightSlot>
        </DropdownMenuItemLink>
        <DropdownMenuItemLink href="/search">
          <Text size="small" ellipsis>
            Profile
          </Text>
        </DropdownMenuItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItemLink href="https://www.spotify.com/us/account/apps/" external>
          Remove access
          <DropdownMenuItemRightSlot>
            <Icon name="external-link" />
          </DropdownMenuItemRightSlot>
        </DropdownMenuItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text size="small" ellipsis>
            Logout
          </Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
