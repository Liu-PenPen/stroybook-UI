import React, { useState } from 'react';
import { Modal, Button, Select, Input, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

export interface SqlFilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic: 'AND' | 'OR';
}

export interface SqlFilterModalProps {
  visible?: boolean;
  onCancel?: () => void;
  onOk?: (sqlQuery: string) => void;
  columns?: any[];
  tableName?: string;
  title?: string;
  width?: number;
}

const SqlFilterModal: React.FC<SqlFilterModalProps> = ({
  visible = false,
  onCancel,
  onOk,
  columns = [],
  tableName = '',
  title = "SQL筛选条件",
  width = 900,
}) => {
  const [conditions, setConditions] = useState<SqlFilterCondition[]>([]);
  const [sqlQuery, setSqlQuery] = useState<string>('');

  const sqlOperators = [
    { value: 'LIKE', label: 'LIKE (模糊匹配)' },
    { value: 'NOT LIKE', label: 'NOT LIKE (不匹配)' },
    { value: '=', label: '= (等于)' },
    { value: '!=', label: '!= (不等于)' },
    { value: '>', label: '> (大于)' },
    { value: '<', label: '< (小于)' },
    { value: '>=', label: '>= (大于等于)' },
    { value: '<=', label: '<= (小于等于)' },
    { value: 'IN', label: 'IN (包含于)' },
    { value: 'NOT IN', label: 'NOT IN (不包含于)' },
    { value: 'IS NULL', label: 'IS NULL (为空)' },
    { value: 'IS NOT NULL', label: 'IS NOT NULL (不为空)' },
  ];

  const addCondition = () => {
    const newCondition: SqlFilterCondition = {
      id: Date.now().toString(),
      field: '',
      operator: 'LIKE',
      value: '',
      logic: 'AND',
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    const newConditions = conditions.filter(condition => condition.id !== id);
    setConditions(newConditions);
    generateSqlQuery(newConditions);
  };

  const updateCondition = (id: string, field: keyof SqlFilterCondition, value: string) => {
    const newConditions = conditions.map(condition => {
      if (condition.id === id) {
        const updatedCondition = { ...condition, [field]: value };
        if (field === 'field') {
          updatedCondition.value = '';
        }
        return updatedCondition;
      }
      return condition;
    });
    setConditions(newConditions);
    generateSqlQuery(newConditions);
  };

  const generateSqlQuery = (conditionList: SqlFilterCondition[]) => {
    if (conditionList.length === 0) {
      setSqlQuery(``);
      return;
    }

    const validConditions = conditionList.filter(condition => 
      condition.field && condition.operator && (condition.value || ['IS NULL', 'IS NOT NULL'].includes(condition.operator))
    );

    if (validConditions.length === 0) {
      setSqlQuery(``);
      return;
    }

    let whereClause = '';
    validConditions.forEach((condition, index) => {
      let conditionStr = '';
      
      if (index > 0) {
        conditionStr += ` ${condition.logic} `;
      }

      if (['IS NULL', 'IS NOT NULL'].includes(condition.operator)) {
        conditionStr += `${condition.field} ${condition.operator}`;
      } else if (condition.operator === 'LIKE' || condition.operator === 'NOT LIKE') {
        conditionStr += `${condition.field} ${condition.operator} '%${condition.value}%'`;
      } else if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
        const values = condition.value.split(',').map(v => `'${v.trim()}'`).join(', ');
        conditionStr += `${condition.field} ${condition.operator} (${values})`;
      } else {
        conditionStr += `${condition.field} ${condition.operator} '${condition.value}'`;
      }

      whereClause += conditionStr;
    });

    const query = `${whereClause}`;
    setSqlQuery(query);
  };

  const handleOk = () => {
    onOk?.(sqlQuery);
  };

  const handleReset = () => {
    setConditions([]);
    setSqlQuery(``);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  React.useEffect(() => {
    generateSqlQuery(conditions);
  }, []);

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
          执行SQL
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
                    backgroundColor: '#52c41a',
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
                {index > 0 && (
                  <Select
                    value={condition.logic}
                    onChange={(value) => updateCondition(condition.id, 'logic', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="AND">AND</Option>
                    <Option value="OR">OR</Option>
                  </Select>
                )}
              </Col>
              <Col span={5}>
                <Select
                  placeholder="选择字段"
                  value={condition.field}
                  onChange={(value) => updateCondition(condition.id, 'field', value)}
                  style={{ width: '100%' }}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
                  }
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
              <Col span={5}>
                <Select
                  placeholder="SQL操作符"
                  value={condition.operator}
                  onChange={(value) => updateCondition(condition.id, 'operator', value)}
                  style={{ width: '100%' }}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {sqlOperators.map(op => (
                    <Option key={op.value} value={op.value}>
                      {op.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={6}>
                {!['IS NULL', 'IS NOT NULL'].includes(condition.operator) && (
                  <Input
                    placeholder="输入值"
                    value={condition.value}
                    onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                    style={{ width: '100%' }}
                  />
                )}
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
          style={{ paddingLeft: 0, color: '#52c41a' }}
        >
          添加条件
        </Button>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 8, fontWeight: 'bold' }}>生成的SQL语句：</div>
        <TextArea
          value={sqlQuery}
          readOnly
          rows={4}
          style={{ backgroundColor: '#f5f5f5', fontFamily: 'monospace' }}
        />
      </div>
    </Modal>
  );
};

export default SqlFilterModal; 