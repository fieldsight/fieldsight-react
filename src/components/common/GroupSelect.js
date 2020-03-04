import React from 'react';
import Select from 'react-select';

export const scheduled = [
  { id: 1140, value: 'org Form', label: 'org Form' },
  { id: 441, value: 'form1', label: 'form1' },
  { id: 413, value: 'form1', label: 'form1' },
];
export const staged = {
  staged: [
    {
      name: 'stage 11',
      sub_stages: [
        {
          id: 26,
          title: 'form5',
        },
        {
          id: 27,
          title: 'form5',
        },
      ],
    },
    {
      name: 'stage 12',
      sub_stages: [
        {
          id: 28,
          title: 'form4',
        },
      ],
    },
  ],
};
export const generals = {
  generals: [
    {
      id: 1293,
      title: 'feb form',
    },
    {
      id: 1262,
      title: 'schol 9',
    },
    {
      id: 1235,
      title: 'form8',
    },
    {
      id: 1204,
      title: 'org General Form',
    },
    {
      id: 1169,
      title: 'form3',
    },
    {
      id: 1111,
      title: 'form7',
    },
    {
      id: 1082,
      title: 'sitelevel form',
    },
    {
      id: 273,
      title: 'form1',
    },
    {
      id: 245,
      title: 'form1',
    },
    {
      id: 74,
      title: 'sitelevel form',
    },
    {
      id: 2,
      title: 'form2',
    },
    {
      id: 4,
      title: 'form5',
    },
    {
      id: 3,
      title: 'form4',
    },
    {
      id: 1,
      title: 'form1',
    },
  ],
};
export const survey = {
  survey: [
    {
      id: 36,
      title: 'form3',
    },
    {
      id: 30,
      title: 'form6',
    },
  ],
};

export const groupedOptions = [
  {
    label: 'Schedules',
    options: scheduled,
  },
];

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 12,
  height: '30px',
  color: 'black',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span
      style={{
        margin: '0 auto',
        border: '2px solid ',
        borderRadius: '25px',
        backgroundColor: 'grey',
        padding: '8px',
        color: 'white',
      }}
    >
      {data.label}
    </span>
    <span style={groupBadgeStyles}>{1}</span>
  </div>
);

export default () => (
  <Select
    options={groupedOptions}
    formatGroupLabel={formatGroupLabel}
  />
);
