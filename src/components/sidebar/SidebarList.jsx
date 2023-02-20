import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Badge } from '../Badge/Badge';
import './SideBar.scss';
import removeSvg from '../../assets/img/remove.svg';

export const SidebarList = ({ items, isRemovable, onClick, onRemove }) => {
	const removeList = (item) => {
		if (window.confirm('Вы уверены что хотите это удалить?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id);
			});
		}
	};
	if (items) {
		return (
			<ul className='list' onClick={onClick}>
				{items.map((item, index) => (
					<li
						key={index}
						className={classNames(item.className, {
							active: item.active,
						})}
					>
						<i>
							{item.icon ? (
								item.icon
							) : (
								<Badge color={item.color.name} />
							)}
						</i>
						<p>{item.name}</p>
						{isRemovable && (
							<img
								src={removeSvg}
								className='list__remove-icon'
								alt='remove icon'
								onClick={() => removeList(item)}
							></img>
						)}
					</li>
				))}
			</ul>
		);
	}
};
