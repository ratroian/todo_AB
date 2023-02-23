import React, { useEffect, useState } from 'react';
import { SidebarList } from '../sidebar/SidebarList';
import './AddListButton.scss';
import { Badge } from '../Badge/Badge';
import closeSVG from '../../assets/img/close.svg';
import axios from 'axios';

export const AddButtonList = ({ colors, onAdd }) => {
	const [isVisiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, selectColor] = useState(3);
	const [isLoading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectColor(colors[0].id);
		}
	}, [colors]);

	const onClose = () => {
		setVisiblePopup(false);
		setInputValue('');
		selectColor(colors[0].id);
	};

	const addList = () => {
		if (!inputValue) {
			alert('No Task');
			return;
		}

		setLoading(true);
		axios
			.post('http://localhost:3001/lists', {
				name: inputValue,
				colorId: selectedColor,
			})
			.then(({ data }) => {
				const color = colors.filter(
					(color) => color.id === selectedColor
				)[0].name;
				const listObj = { ...data, color: { name: color } };
				onAdd(listObj);
				onClose();
			})
			.catch(() => {
				alert('Ошибка запроса');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className='add-list'>
			<SidebarList
				onClick={() => setVisiblePopup(true)}
				items={[
					{
						className: 'list__add-button',
						icon: (
							<svg
								width='12'
								height='12'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8 1V15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M1 8H15'
									stroke='black'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						),
						name: 'Add list',
					},
				]}
			/>
			{isVisiblePopup && (
				<div className='add-list__popup popup'>
					<img
						src={closeSVG}
						className='add-list__popup-close'
						alt='close btn'
						onClick={onClose}
					/>
					<input
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						className='input'
						type='text'
						placeholder='Name category'
					/>
					<div className='popup__colors'>
						{colors.map((color) => (
							<Badge
								onClick={() => selectColor(color.id)}
								color={color.name}
								key={color.id}
								className={
									selectedColor === color.id && 'active'
								}
							/>
						))}
					</div>
					<button className='button popup__button' onClick={addList}>
						{isLoading ? 'In process...' : 'Add category'}
					</button>
				</div>
			)}
		</div>
	);
};
