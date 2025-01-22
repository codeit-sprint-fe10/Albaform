import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Button';
import iconUrl from '@/public/icons/info.svg?url';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    content: 'Solid',
  },
};

export const SolidDisabled: Story = {
  args: {
    content: 'Solid Disabled',
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    content: 'Outlined',
    design: 'outlined',
  },
};

export const OutlinedDisabled: Story = {
  args: {
    content: 'Outlined Disabled',
    design: 'outlined',
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    content: 'Icon',
    iconUrl: iconUrl,
  },
};

export const Style: Story = {
  args: {
    content: 'Style',
    sizeClass: 'w-28 h-28 mt-16 mx-auto rounded-full text-2xl',
    className: 'animate-spin shadow-lg',
    design: 'solid',
    disabled: false,
  },
};
