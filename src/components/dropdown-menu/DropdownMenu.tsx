import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type * as Radix from '@radix-ui/react-primitive';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { IconContainer } from '../icon';
import { Link } from '@/components/link';
import { styled } from '@/lib/stitches.config';

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  minWidth: '160px',
  maxWidth: '350px',
  backgroundColor: '$dropdownBackground',
  borderRadius: '$base',
  maxHeight: 'calc(100vh - 24px)',
  padding: '$spacing02',
  boxShadow: '0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2)',
});

const itemStyles = {
  all: 'unset',
  fontSize: '$fontSize02',
  borderRadius: '$sm',
  lineHeight: 1,
  color: '$textBase',
  display: 'flex',
  alignItems: 'center',
  height: 40,
  position: 'relative',
  paddingInlineStart: '$spacing04',
  paddingInlineEnd: '$spacing03',
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:focus': {
    backgroundColor: '$dropdownItemHighlight',
    color: '$textBase',
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
const StyledItemLink = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
  [`${Link}`]: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    cursor: 'default',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});
const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  // If the item has "submenu"
  '&[data-state="open"]': {
    backgroundColor: '$dropdownItemHighlight',
    color: '$textBase',
  },
  ...itemStyles,
});
const StyledItemRightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: '$spacing05',
  color: '$textBase',
  '&:focus > &': { color: '$textBase' },
  [`${IconContainer}`]: {
    width: '16px',
    height: '16px',
  },
});

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: 1,
  backgroundColor: '$dropdownItemHighlight',
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: '$dropdownBackground',
});

const ItemLink = ({
  children,
  href,
  external,
  ...props
}: PropsWithChildren<
  {
    href: string;
    external?: boolean;
  } & Radix.ComponentPropsWithoutRef<typeof StyledItem>
>) => {
  const router = useRouter();
  const handleNavigation = () => {
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };
  return (
    <StyledItemLink {...props} onClick={handleNavigation} onSelect={handleNavigation}>
      <NextLink href={href} passHref>
        {external ? (
          <Link href={href} target={'_blank'} rel="noopener noreferrer">
            {children}
          </Link>
        ) : (
          <Link href={href}>{children}</Link>
        )}
      </NextLink>
    </StyledItemLink>
  );
};

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuItemLink = ItemLink;
export const DropdownMenuItemRightSlot = StyledItemRightSlot;
export const DropdownMenuTriggerItem = StyledTriggerItem;
export const DropdownMenuSeparator = StyledSeparator;
export const DropdownMenuArrow = StyledArrow;
