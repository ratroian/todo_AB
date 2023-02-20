import React from 'react';
import './Badge.scss';
import classNames from 'classnames';

export const Badge = ({ color, onClick, className }) => {
	return (
		<div
			onClick={onClick}
			className={classNames(
				'badge',
				{ [`badge--${color}`]: color },
				className
			)}
		></div>
	);
};
