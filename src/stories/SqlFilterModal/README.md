# SqlFilterModal Storybook 组件

## 组件说明

SqlFilterModal 是一个用于生成SQL WHERE子句的筛选弹框组件，支持多种SQL操作符，可以动态生成SQL查询条件。

## 功能特点

1. **SQL操作符支持**：支持LIKE、NOT LIKE、=、!=、>、<、>=、<=、IN、NOT IN、IS NULL、IS NOT NULL等操作符
2. **逻辑连接符**：支持AND、OR逻辑连接多个条件
3. **动态列选择**：根据传入的columns配置动态生成字段选项
4. **实时SQL生成**：根据条件实时生成SQL WHERE子句
5. **可定制化**：支持自定义标题、宽度等属性
6. **SQL预览**：实时显示生成的SQL语句

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 控制弹框显示/隐藏 |
| title | string | "SQL筛选条件" | 弹框标题 |
| width | number | 900 | 弹框宽度 |
| columns | array | [] | 表格列配置 |
| tableName | string | "" | 表名 |
| onCancel | function | - | 取消回调函数 |
| onOk | function | - | 确认回调函数，参数为生成的SQL语句 |

## SQL条件结构

```typescript
interface SqlFilterCondition {
  id: string;        // 条件唯一标识
  field: string;     // 字段名
  operator: string;  // SQL操作符
  value: string;     // 过滤值
  logic: 'AND' | 'OR'; // 逻辑连接符
}
```

## 支持的SQL操作符

- `LIKE` - 模糊匹配
- `NOT LIKE` - 不匹配
- `=` - 等于
- `!=` - 不等于
- `>` - 大于
- `<` - 小于
- `>=` - 大于等于
- `<=` - 小于等于
- `IN` - 包含于
- `NOT IN` - 不包含于
- `IS NULL` - 为空
- `IS NOT NULL` - 不为空

## 使用示例

### 基础用法

```tsx
import SqlFilterModal from '@/stories/SqlFilterModal/SqlFilterModal';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '部门', dataIndex: 'department' },
];

const [visible, setVisible] = useState(false);

const handleOk = (sqlQuery: string) => {
  console.log('生成的SQL:', sqlQuery);
  setVisible(false);
};

<SqlFilterModal
  visible={visible}
  columns={columns}
  tableName="users"
  onOk={handleOk}
  onCancel={() => setVisible(false)}
/>
```

### 在表格中使用

```tsx
import SqlFilterModal from '@/stories/SqlFilterModal/SqlFilterModal';

const UserTable = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [generatedSql, setGeneratedSql] = useState('');

  const handleFilterOk = (sqlQuery: string) => {
    setGeneratedSql(sqlQuery);
    setFilterVisible(false);
    // 调用后端API执行SQL查询
  };

  return (
    <>
      <Button onClick={() => setFilterVisible(true)}>
        SQL筛选
      </Button>
      
      <SqlFilterModal
        visible={filterVisible}
        columns={columns}
        tableName="users"
        onOk={handleFilterOk}
        onCancel={() => setFilterVisible(false)}
      />
    </>
  );
};
```

## 生成的SQL示例

### 单条件查询
```
name LIKE '%张%'
```

### 多条件AND查询
```
name LIKE '%张%' AND department = '技术部' AND age > 25
```

### 多条件OR查询
```
department = '技术部' OR department = '产品部'
```

### IN查询
```
status IN ('在职', '试用期')
```

### NULL查询
```
email IS NOT NULL
```

## Storybook 示例

在 Storybook 中提供了以下示例：

1. **Default** - 基础用法
2. **WithInitialConditions** - 带初始条件的用法
3. **CustomTitle** - 自定义标题
4. **DifferentWidth** - 不同宽度
5. **EmptyColumns** - 空列数据
6. **ComplexColumns** - 复杂列数据
7. **Demo** - 完整演示（包含表格和SQL生成功能）

### 运行 Storybook

```bash
npm run storybook
```

然后在浏览器中访问 `http://localhost:6006` 查看组件文档和示例。

## 界面设计

- **绿色圆形数字标识**：每个条件都有绿色圆形数字标识（1、2、3...）
- **逻辑连接符**：第二个条件开始可以选择AND或OR连接符
- **字段选择**：下拉选择要查询的字段
- **操作符选择**：下拉选择SQL操作符
- **值输入**：输入查询值（IS NULL和IS NOT NULL不需要输入值）
- **SQL预览**：实时显示生成的SQL WHERE子句
- **操作按钮**：重置、取消、执行SQL三个按钮
- **添加按钮**：绿色的"添加条件"链接按钮

## 技术实现

- 使用 React Hooks 管理状态
- 使用 Ant Design 组件库构建界面
- 支持 TypeScript 类型检查
- 实时SQL语句生成
- 完全可配置的组件设计
- 支持 Storybook 文档自动生成

## 注意事项

1. **SQL注入防护**：生成的SQL语句中的值会自动添加单引号，但仍需在后端进行参数化查询
2. **字段验证**：建议在后端验证字段名的合法性
3. **权限控制**：确保用户只能查询有权限的字段和表
4. **性能考虑**：复杂的SQL查询可能影响数据库性能，建议添加查询限制 