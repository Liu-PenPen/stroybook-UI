# FilterModal Storybook 组件

## 组件说明

FilterModal 是一个用于表格数据筛选的弹框组件，支持多条件过滤，界面设计参考了图片中的筛选条件弹框。

## 功能特点

1. **多条件过滤**：支持添加多个过滤条件，条件之间使用"且"（AND）逻辑连接
2. **灵活的过滤操作**：支持包含、不包含、等于、不等于、开头是、结尾是等操作
3. **动态列选择**：根据传入的columns配置动态生成列名选项
4. **实时交互**：支持添加、删除、重置过滤条件
5. **可定制化**：支持自定义标题、宽度等属性

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| visible | boolean | false | 控制弹框显示/隐藏 |
| title | string | "筛选条件" | 弹框标题 |
| width | number | 800 | 弹框宽度 |
| columns | array | [] | 表格列配置 |
| onCancel | function | - | 取消回调函数 |
| onOk | function | - | 确认回调函数，参数为过滤条件数组 |

## 过滤条件结构

```typescript
interface FilterCondition {
  id: string;        // 条件唯一标识
  field: string;     // 字段名
  operator: string;  // 操作符
  value: string;     // 过滤值
}
```

## 支持的过滤操作

- `contains` - 包含
- `not_contains` - 不包含
- `equals` - 等于
- `not_equals` - 不等于
- `starts_with` - 开头是
- `ends_with` - 结尾是

## 使用示例

### 基础用法

```tsx
import FilterModal from '@/stories/FilterModal/FilterModal';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '部门', dataIndex: 'department' },
];

const [visible, setVisible] = useState(false);

const handleOk = (conditions) => {
  console.log('过滤条件:', conditions);
  setVisible(false);
};

<FilterModal
  visible={visible}
  columns={columns}
  onOk={handleOk}
  onCancel={() => setVisible(false)}
/>
```

### 在表格中使用

```tsx
import FilterModal from '@/stories/FilterModal/FilterModal';

const UserTable = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterOk = (conditions) => {
    setActiveFilters(conditions);
    setFilterVisible(false);
    // 重新加载表格数据
  };

  return (
    <>
      <Button onClick={() => setFilterVisible(true)}>
        筛选 {activeFilters.length > 0 ? activeFilters.length : ''}
      </Button>
      
      <FilterModal
        visible={filterVisible}
        columns={columns}
        onOk={handleFilterOk}
        onCancel={() => setFilterVisible(false)}
      />
    </>
  );
};
```

## Storybook 示例

在 Storybook 中提供了以下示例：

1. **Default** - 基础用法
2. **WithInitialConditions** - 带初始条件的用法
3. **CustomTitle** - 自定义标题
4. **DifferentWidth** - 不同宽度
5. **EmptyColumns** - 空列数据
6. **ComplexColumns** - 复杂列数据
7. **Demo** - 完整演示（包含表格和实际过滤功能）

### 运行 Storybook

```bash
npm run storybook
```

然后在浏览器中访问 `http://localhost:6006` 查看组件文档和示例。

## 界面设计

- **蓝色圆形数字标识**：每个条件都有蓝色圆形数字标识（1、2、3...）
- **逻辑连接词**：第一个条件显示"当"，后续条件显示"且"
- **下拉选择**：列名和过滤操作都使用下拉框选择
- **输入框**：用于输入过滤值
- **操作按钮**：重置、取消、筛选三个按钮
- **添加按钮**：蓝色的"添加"链接按钮

## 技术实现

- 使用 React Hooks 管理状态
- 使用 Ant Design 组件库构建界面
- 支持 TypeScript 类型检查
- 完全可配置的组件设计
- 支持 Storybook 文档自动生成 