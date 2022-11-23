import React, { FC, useState } from 'react';
import { useStyles } from './ChartModal.styles';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import classNames from 'classnames';
import { get } from 'lodash';
import { CustomModal } from './../CustomModal/CustomModal';
import { RefugeeData } from './../../interfaces/RefugeeData';

interface Props {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  data: RefugeeData[];
  fieldName: string;
  title: string;
}

export enum ChartTypes {
  Pie = 'Pie',
  Bar = 'Bar',
}

export const ChartModal: FC<Props> = ({ isOpen, setIsOpen, data, fieldName, title }) => {
  const styles = useStyles();
  const labels = Array.from(new Set(data.map((refugee) => get(refugee, fieldName))));
  const dataForMovedFrom = labels.map((label) => ({
    name: label,
    value: data.filter((refugee) => get(refugee, fieldName) === label).length,
  }));
  const [currentChart, setCurrentChart] = useState(ChartTypes.Pie);

  return (
    <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} crossIcon>
      <div className={styles.modalBody}>
        <div className={styles.options}>
          <div
            className={classNames(styles.option, { [styles.activeOption]: currentChart === ChartTypes.Pie })}
            onClick={() => setCurrentChart(ChartTypes.Pie)}
          >
            Pie
          </div>
          <div
            className={classNames(styles.option, { [styles.activeOption]: currentChart === ChartTypes.Bar })}
            onClick={() => setCurrentChart(ChartTypes.Bar)}
          >
            Bar
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          {currentChart === ChartTypes.Pie ? (
            <PieChart width={450} height={450}>
              <Pie
                dataKey="value"
                legendType={'star'}
                data={dataForMovedFrom}
                cx="50%"
                cy="50%"
                outerRadius={170}
                fill="#8884d8"
                label
                paddingAngle={1}
              />
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart width={450} height={100} data={dataForMovedFrom}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar dataKey="value" name={`The distribution of people ${title}`} fill="#82ca9d" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </CustomModal>
  );
};
