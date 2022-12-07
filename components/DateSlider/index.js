import { Tabs } from 'antd';

const DateSlider = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="0"
        tabPosition="top"
        style={{
          height: 220,
        }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  )
}

export default DateSlider;