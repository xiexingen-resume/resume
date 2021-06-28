import React from 'react';
import { Timeline, Card, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function (props) {
  const { dataSource } = props;
  const getDotByLast = (index: number) => {
    if (index === dataSource.length - 1) {
      return {
        dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
      };
    }
    return {};
  };

  return (
    <Card className="small-card company-time-line" bordered={false}>
      <Divider>工作经历</Divider>
      <Timeline reverse>
        {dataSource.map((item, index) => {
          return (
            <Timeline.Item key={index} {...getDotByLast(index)}>
              <div className="title-line">
                {item.company}
                <span className="date">{item.dateRange}</span>
              </div>
              <p>{item.description}</p>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Card>
  );
}
