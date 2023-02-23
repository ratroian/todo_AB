import React from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { Badge } from '../Badge/Badge';
import './SideBar.scss';
import removeSvg from '../../assets/img/remove.svg';

export const SidebarList = ({
	items,
	isRemovable,
	onClick,
	onRemove,
	onClickItem,
	activeItem,
}) => {
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
							active: item.active
								? item.active
								: activeItem && activeItem.id === item.id,
						})}
						onClick={onClickItem ? () => onClickItem(item) : null}
					>
						<i>
							{item.icon ? (
								item.icon
							) : (
								<Badge color={item.color.name} />
							)}
						</i>
						<p>
							{item.name}
							{item.tasks &&
								item.tasks.length > 0 &&
								`  (${item.tasks.length})`}
						</p>
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
