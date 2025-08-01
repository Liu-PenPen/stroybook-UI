import React, { useState } from 'react';
import { Modal, Button, Select, Input, Space, Tag, Row, Col, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FilterModalProps {
  visible?: boolean;
  onCancel?: () => void;
  onOk?: (conditions: FilterCondition[]) => void;
  columns?: any[];
  title?: string;
  width?: number;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible = false,
  onCancel,
  onOk,
  columns = [],
  title = "筛选条件",
  width = 800,
}) => {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);

  const filterOperators = [
    { value: 'contains', label: '包含' },
    { value: 'not_contains', label: '不包含' },
    { value: 'equals', label: '等于' },
    { value: 'not_equals', label: '不等于' },
    { value: 'starts_with', label: '开头是' },
    { value: 'ends_with', label: '结尾是' },
  ];

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: '',
      operator: 'contains',
      value: '',
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };

  const updateCondition = (id: string, field: keyof FilterCondition, value: string) => {
    setConditions(conditions.map(condition => 
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  const handleOk = () => {
    const validConditions = conditions.filter(condition => 
      condition.field && condition.operator && condition.value
    );
    onOk?.(validConditions);
  };

  const handleReset = () => {
    setConditions([]);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const getColumnTitle = (dataIndex: string) => {
    const column = columns.find(col => col.dataIndex === dataIndex);
    return column?.title || dataIndex;
  };

  const getOperatorLabel = (operator: string) => {
    const op = filterOperators.find(op => op.value === operator);
    return op?.label || operator;
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={handleCancel}
      width={width}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="filter" type="primary" onClick={handleOk}>
          筛选
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        {conditions.map((condition, index) => (
          <div key={condition.id} style={{ marginBottom: 16 }}>
            <Row gutter={8} align="middle">
              <Col span={1}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </div>
              </Col>
              <Col span={2}>
                <span style={{ fontSize: 14 }}>
                  {index === 0 ? '当' : '且'}
                </span>
              </Col>
              <Col span={6}>
                <Select
                  placeholder="选择列名"
                  showSearch
                  value={condition.field}
                  onChange={(value) => updateCondition(condition.id, 'field', value)}
                  style={{ width: '100%' }}
                >
                  {columns
                    .filter(col => col.dataIndex && col.title)
                    .map(col => (
                      <Option key={col.dataIndex} value={col.dataIndex}>
                        {typeof col.title === 'string' ? col.title : col.dataIndex}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  placeholder="过滤条件"
                  value={condition.operator}
                  showSearch
                  onChange={(value) => updateCondition(condition.id, 'operator', value)}
                  style={{ width: '100%' }}
                >
                  {filterOperators.map(op => (
                    <Option key={op.value} value={op.value}>
                      {op.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={6}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      placeholder="输入值"
                      value={condition.value}
                      onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </div>
              </Col>
              <Col span={2}>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeCondition(condition.id)}
                  danger
                />
              </Col>
            </Row>
          </div>
        ))}
        
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={addCondition}
          style={{ paddingLeft: 0, color: '#1890ff' }}
        >
          添加
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal; 