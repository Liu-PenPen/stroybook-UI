import type { Meta, StoryObj } from '@storybook/react';
import SqlFilterModal from './SqlFilterModal';
import SqlFilterModalDemo from './SqlFilterModalDemo';
import { useState } from 'react';

// 模拟表格列数据
const mockColumns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    key: 'id',
  },
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
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    key: 'salary',
  },
];

const meta: Meta<typeof SqlFilterModal> = {
  title: 'stories/SqlFilterModal/SqlFilterModal',
  component: SqlFilterModal,
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
    tableName: {
      control: 'text',
      description: '表名',
    },
    onCancel: {
      action: 'cancelled',
      description: '取消回调',
    },
    onOk: {
      action: 'confirmed',
      description: '确认回调，返回生成的SQL语句',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Default: Story = {
  args: {
    visible: true,
    title: 'SQL筛选条件',
    width: 900,
    columns: mockColumns,
    tableName: 'users',
  },
};

// 带初始条件的用法
export const WithInitialConditions: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    
    const handleOk = (sqlQuery: string) => {
      console.log('Generated SQL:', sqlQuery);
      setVisible(false);
    };
    
    const handleCancel = () => {
      setVisible(false);
    };
    
    return (
      <SqlFilterModal
        {...args}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    );
  },
  args: {
    title: 'SQL筛选条件',
    width: 900,
    columns: mockColumns,
    tableName: 'users',
  },
};

// 自定义标题
export const CustomTitle: Story = {
  args: {
    visible: true,
    title: '自定义SQL筛选条件',
    width: 900,
    columns: mockColumns,
    tableName: 'users',
  },
};

// 不同宽度
export const DifferentWidth: Story = {
  args: {
    visible: true,
    title: 'SQL筛选条件',
    width: 1200,
    columns: mockColumns,
    tableName: 'users',
  },
};

// 空列数据
export const EmptyColumns: Story = {
  args: {
    visible: true,
    title: 'SQL筛选条件',
    width: 900,
    columns: [],
    tableName: 'users',
  },
};

// 复杂列数据
export const ComplexColumns: Story = {
  args: {
    visible: true,
    title: 'SQL筛选条件',
    width: 900,
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
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '薪资',
        dataIndex: 'salary',
        key: 'salary',
      },
      {
        title: '入职日期',
        dataIndex: 'hireDate',
        key: 'hireDate',
      },
    ],
    tableName: 'users',
  },
};

// 完整演示
export const Demo: Story = {
  render: () => <SqlFilterModalDemo />,
  parameters: {
    layout: 'fullscreen',
  },
}; 