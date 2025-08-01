import PDFPreView from './PDFPreView';

const data = {
  工单号: 'WO20240726001',
  车牌号: '沪A12345',
  司机: '张三',
  联系电话: '13800000000',
  状态: '已完成',
  时间: '2024-07-26 10:00',
};

export default {
  title: 'stories/PDF/PDFPreView',
  component: PDFPreView,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    footer: { control: 'text' },
    data: { control: 'object' },
  },
};

export const Default = {
  args: {
    title: '内集卡分箱状态运行指标',
    footer: '© 2024 某某公司  |  第 1 / 1 页',
    data,
  },
};

