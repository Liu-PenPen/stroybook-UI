import type { Meta, StoryObj } from '@storybook/react';
import FilterModal from './FilterModal';
import FilterModalDemo from './FilterModalDemo';
import { useState } from 'react';

// 模拟表格列数据
const mockColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

const meta: Meta<typeof FilterModal> = {
  title: 'stories/FilterModal/FilterModal',
  component: FilterModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: '控制弹框显示/隐藏',
    },
    title: {
      control: 'text',
      description: '弹框标题',
    },
    width: {
      control: 'number',
      description: '弹框宽度',
    },
    columns: {
      control: 'object',
      description: '表格列配置',
    },
    onCancel: {
      action: 'cancelled',
      description: '取消回调',
    },
    onOk: {
      action: 'confirmed',
      description: '确认回调',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    visible: true,
    title: '筛选条件',
    width: 800,
    columns: mockColumns,
  },
};

// 带初始条件的用法
export const WithInitialConditions: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    
    const handleOk = (conditions: any[]) => {
      console.log('Filter conditions:', conditions);
      setVisible(false);
    };
    
    const handleCancel = () => {
      setVisible(false);
    };
    
    return (
      <FilterModal
        {...args}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    );
  },
  args: {
    title: '筛选条件',
    width: 800,
    columns: mockColumns,
  },
};

// 自定义标题
export const CustomTitle: Story = {
  args: {
    visible: true,
    title: '自定义筛选条件',
    width: 800,
    columns: mockColumns,
  },
};

// 不同宽度
export const DifferentWidth: Story = {
  args: {
    visible: true,
    title: '筛选条件',
    width: 1000,
    columns: mockColumns,
  },
};

// 空列数据
export const EmptyColumns: Story = {
  args: {
    visible: true,
    title: '筛选条件',
    width: 800,
    columns: [],
  },
};

// 复杂列数据
export const ComplexColumns: Story = {
  args: {
    visible: true,
    title: '筛选条件',
    width: 800,
    columns: [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '邮箱地址',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '所属部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '用户角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '账号状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '最后登录时间',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
      },
    ],
  },
};

// 完整演示
export const Demo: Story = {
  render: () => <FilterModalDemo />,
  parameters: {
    layout: 'fullscreen',
  },
}; 