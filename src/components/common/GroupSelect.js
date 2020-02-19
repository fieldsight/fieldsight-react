import React from 'react';
import Select from 'react-select';

export const scheduled = [
  { id: 1140, value: 'org Form', label: 'org Form' },
  { id: 441, value: 'form1', label: 'form1' },
  { id: 413, value: 'form1', label: 'form1' },
];
// export const scheduled = {
//   scheduled: [
//     {
//       id: 1140,
//       title: 'org Form',
//     },
//     {
//       id: 441,
//       title: 'form1',
//     },
//     {
//       id: 413,
//       title: 'form1',
//     },
//     {
//       id: 385,
//       title: 'form1',
//     },
//     {
//       id: 357,
//       title: 'form1',
//     },
//     {
//       id: 329,
//       title: 'form1',
//     },
//     {
//       id: 301,
//       title: 'form1',
//     },
//     {
//       id: 217,
//       title: 'form8',
//     },
//     {
//       id: 182,
//       title: 'form2',
//     },
//     {
//       id: 155,
//       title: 'form1',
//     },
//     {
//       id: 128,
//       title: 'form6',
//     },
//     {
//       id: 101,
//       title: 'form6',
//     },
//     {
//       id: 13,
//       title: 'form1',
//     },
//     {
//       id: 23,
//       title: 'form2',
//     },
//     {
//       id: 14,
//       title: 'form4',
//     },
//     {
//       id: 25,
//       title: 'form8',
//     },
//   ],
// };
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
// export const colourOptions = [
//   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
//   {
//     value: 'blue',
//     label: 'Blue',
//     color: '#0052CC',
//     // isDisabled: true,
//   },
//   { value: 'purple', label: 'Purple', color: '#5243AA' },
//   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
//   { value: 'orange', label: 'Orange', color: '#FF8B00' },
//   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
//   { value: 'green', label: 'Green', color: '#36B37E' },
//   { value: 'forest', label: 'Forest', color: '#00875A' },
//   { value: 'slate', label: 'Slate', color: '#253858' },
//   { value: 'silver', label: 'Silver', color: '#666666' },
// ];

// export const flavourOptions = [
//   { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
//   { value: 'chocolate', label: 'Chocolate', rating: 'good' },
//   { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
//   {
//     value: 'salted-caramel',
//     label: 'Salted Caramel',
//     rating: 'crazy',
//   },
// ];

export const groupedOptions = [
  {
    label: 'Schedules',
    options: scheduled,
  },
  //   {
  //     label: 'Staged',
  //     options: staged,
  //   },
  //   {
  //     label: 'Generals',
  //     options: generals,
  //   },
  //   {
  //     label: 'Survey',
  //     options: survey,
  //   },
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
    // defaultValue={colourOptions[1]}
    options={groupedOptions}
    formatGroupLabel={formatGroupLabel}
  />
);
