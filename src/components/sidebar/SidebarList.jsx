import React from 'react';
import './SideBar.scss';

export const SidebarList = ({ items }) => {
	return (
		<ul className='list'>
			{items.map((item) => (
				<li className={item.active ? 'active' : ''}>
					<i>
						{item.icon ? (
							item.icon
						) : (
							<i className={`badge badge--${item.color}`}></i>
						)}
					</i>
					<p>{item.name}</p>
				</li>
			))}
		</ul>
	);
};
