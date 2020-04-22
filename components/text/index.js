/* eslint-disable react/prop-types */
import React from 'react';
import { block } from 'bem-cn';

import './index.scss';

const b = block('text');

export default ({ children, theme }) => {
    return <div className={b({ theme })}>{children}</div>;
};
