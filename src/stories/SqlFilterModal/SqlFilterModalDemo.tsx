import React, { useState } from 'react';
import { Button, Table, Space, message, Card, Typography } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import SqlFilterModal from './SqlFilterModal';
import type { SqlFilterCondition } from './SqlFilterModal';

const { Title, Text } = Typography;

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    department: '技术部',
    status: '在职',
    createTime: '2024-01-01',
    age: 28,
    salary: 15000,
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    department: '产品部',
    status: '在职',
    createTime: '2024-01-02',
    age: 32,
    salary: 18000,
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    department: '技术部',
    status: '离职',
    createTime: '2024-01-03',
    age: 25,
    salary: 12000,
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    department: '市场部',
    status: '在职',
    createTime: '2024-01-04',
    age: 35,
    salary: 20000,
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    department: '技术部',
    status: '在职',
    createTime: '2024-01-05',
    age: 29,
    salary: 16000,
  },
];

// 表格列配置
const columns = [
  {
    title: 'ID',
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

const SqlFilterModalDemo: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [generatedSql, setGeneratedSql] = useState<string>('');
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilterOk = (sqlQuery: string) => {
    setGeneratedSql(sqlQuery);
    setFilterVisible(false);
    
    // 这里可以调用后端API执行SQL查询
    // 现在只是模拟显示SQL语句
    message.success(`SQL查询已生成，共找到 ${filteredData.length} 条记录`);
  };

  const handleFilterCancel = () => {
    setFilterVisible(false);
  };

  const clearSql = () => {
    setGeneratedSql('');
    setFilteredData(mockData);
    message.info('已清除SQL查询');
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={3}>SQL筛选条件演示</Title>
        <Text type="secondary">
          这是一个SQL筛选条件的完整演示，可以生成SQL WHERE子句用于数据库查询。
        </Text>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type="primary"
            icon={<DatabaseOutlined />}
            onClick={() => setFilterVisible(true)}
          >
            SQL筛选
          </Button>
          {generatedSql && (
            <Button onClick={clearSql}>
              清除SQL
            </Button>
          )}
        </Space>
      </div>

      {generatedSql && (
        <Card 
          title="生成的SQL语句" 
          size="small" 
          style={{ marginBottom: 16 }}
          extra={
            <Button 
              size="small" 
              onClick={() => navigator.clipboard.writeText(generatedSql)}
            >
              复制
            </Button>
          }
        >
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: 12, 
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 14,
            border: '1px solid #d9d9d9'
          }}>
            <Text code>{generatedSql}</Text>
          </div>
        </Card>
      )}

      <Card title="用户数据表" size="small">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            total: filteredData.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          size="small"
        />
      </Card>

      <SqlFilterModal
        visible={filterVisible}
        columns={columns}
        onOk={handleFilterOk}
        onCancel={handleFilterCancel}
        title="SQL筛选条件"
        tableName="users"
      />
    </div>
  );
};

export default SqlFilterModalDemo; 