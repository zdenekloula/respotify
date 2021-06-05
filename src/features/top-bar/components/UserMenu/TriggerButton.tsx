import React, { PropsWithChildren } from 'react';
import { StyledBaseButton } from '@/components/button/BaseButton';
import { Text } from '@/components/text';
import { useAuth } from '@/features/auth/AuthProvider';
import { styled } from '@/lib/stitches.config';

const UserMenuAvatarContainer = styled('figure', {
  width: '28px',
  height: '28px',
  margin: 0,
});

const UserMenuAvatar = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '$full',
});

const UserMenuDropdownIcon = styled('div', {
  display: 'flex',
  marginInlineEnd: '$spacing03',
  color: '$textBase',
});

const StyledUserMenuTriggerButton = styled(StyledBaseButton, {
  display: 'flex',
  background: '$topbarButtonBackground',
  borderRadius: '23px',
  height: '32px',
  cursor: 'pointer',
  gap: '$spacing03',
  padding: '2px',
  marginInlineStart: '$spacing05',
  alignItems: 'center',
  justifyContent: 'center',

  [`&:hover, &[data-state='open']`]: {
    background: '$topbarButtonBackgroundHighlight',
  },

  "&[data-state='open']": {
    [`${UserMenuDropdownIcon}`]: {
      transform: 'rotate(180deg)',
    },
  },
});

export type UserMenuTriggerButtonProps = React.ComponentProps<typeof StyledUserMenuTriggerButton>;

export const UserMenuTriggerButton = React.forwardRef(
  (
    { ...props }: PropsWithChildren<UserMenuTriggerButtonProps>,
    reference: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const { user } = useAuth();
    const userImage = user?.images?.length ? user.images[0].url : undefined;
    return (
      <StyledUserMenuTriggerButton ref={reference} {...props}>
        <UserMenuAvatarContainer>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {userImage ? <UserMenuAvatar src={userImage} alt="" /> : undefined}
        </UserMenuAvatarContainer>
        <Text
          size="small"
          weight="bold"
          css={{
            fontSize: '13px',
          }}
          color="base"
        >
          {user?.display_name}
        </Text>
        <UserMenuDropdownIcon>
          <svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 6l-6 6-6-6h12z"></path>
          </svg>
        </UserMenuDropdownIcon>
      </StyledUserMenuTriggerButton>
    );
  }
);

UserMenuTriggerButton.displayName = 'UserMenuTriggerButton';
