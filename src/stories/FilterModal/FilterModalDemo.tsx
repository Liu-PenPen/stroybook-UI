import React, { useState } from 'react';
import { Button, Table, Space, message } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterModal from './FilterModal';
import type { FilterCondition } from './FilterModal';

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    department: '技术部',
    status: '在职',
    createTime: '2024-01-01',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    department: '产品部',
    status: '在职',
    createTime: '2024-01-02',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    department: '技术部',
    status: '离职',
    createTime: '2024-01-03',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    department: '市场部',
    status: '在职',
    createTime: '2024-01-04',
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
];

const FilterModalDemo: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterCondition[]>([]);
  const [filteredData, setFilteredData] = useState(mockData);

  // 应用过滤条件
  const applyFilters = (data: any[], filters: FilterCondition[]) => {
    if (filters.length === 0) return data;

    return data.filter(item => {
      return filters.every(filter => {
        const value = item[filter.field];
        const filterValue = filter.value;

        switch (filter.operator) {
          case 'contains':
            return String(value).includes(filterValue);
          case 'not_contains':
            return !String(value).includes(filterValue);
          case 'equals':
            return String(value) === filterValue;
          case 'not_equals':
            return String(value) !== filterValue;
          case 'starts_with':
            return String(value).startsWith(filterValue);
          case 'ends_with':
            return String(value).endsWith(filterValue);
          default:
            return true;
        }
      });
    });
  };

  const handleFilterOk = (conditions: FilterCondition[]) => {
    setActiveFilters(conditions);
    setFilterVisible(false);
    
    const filtered = applyFilters(mockData, conditions);
    setFilteredData(filtered);
    
    message.success(`应用了 ${conditions.length} 个过滤条件，找到 ${filtered.length} 条记录`);
  };

  const handleFilterCancel = () => {
    setFilterVisible(false);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredData(mockData);
    message.info('已清除所有过滤条件');
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button
            type="primary"
            icon={<FilterOutlined />}
            onClick={() => setFilterVisible(true)}
          >
            筛选 {activeFilters.length > 0 ? activeFilters.length : ''}
          </Button>
          {activeFilters.length > 0 && (
            <Button onClick={clearFilters}>
              清除筛选
            </Button>
          )}
        </Space>
        
        {activeFilters.length > 0 && (
          <div style={{ marginTop: 8, color: '#666' }}>
            当前筛选条件：
            {activeFilters.map((filter, index) => (
              <span key={filter.id} style={{ marginLeft: 8 }}>
                {index > 0 ? '且' : ''} {filter.field} {filter.operator} {filter.value}
              </span>
            ))}
          </div>
        )}
      </div>

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
      />

      <FilterModal
        visible={filterVisible}
        columns={columns}
        onOk={handleFilterOk}
        onCancel={handleFilterCancel}
        title="用户筛选条件"
      />
    </div>
  );
};

export default FilterModalDemo; 