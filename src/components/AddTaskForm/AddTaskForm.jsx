import axios from 'axios';
import React, { useState } from 'react';
import addSvg from '../../assets/img/add.svg';
import './AddTaskForm.scss';

export const AddTaskForm = ({ list, onAddTask }) => {
	const [visibleForm, setFormVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setLoading] = useState('');

	const toggleFormVisible = () => {
		setFormVisible(!visibleForm);
		setInputValue('');
	};

	const addTask = () => {
		const object = {
			listId: list.id,
			text: inputValue,
			completed: false,
		};

		setLoading(true);

		axios
			.post('http://localhost:3001/tasks', object)
			.then(({ data }) => {
				console.log(data);
				onAddTask(list.id, data);
				toggleFormVisible();
			})
			.catch(() => {
				alert('Ошибка запроса');
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className='tasks__form'>
			{!visibleForm ? (
				<div onClick={toggleFormVisible} className='tasks__form-new'>
					<img src={addSvg} alt='add icon' />
					<span>Новая задача</span>
				</div>
			) : (
				<div className='tasks__form-block'>
					<input
						value={inputValue}
						className='input'
						type='text'
						placeholder='Текст задачи'
						onChange={(event) => setInputValue(event.target.value)}
					/>
					<button
						disabled={isLoading}
						onClick={addTask}
						className='button popup__button'
					>
						{isLoading ? 'Добавление' : 'Добавить задачу'}
					</button>
					<button
						onClick={toggleFormVisible}
						className='button popup__button popup__button--grey'
					>
						Отмена
					</button>
				</div>
			)}
		</div>
	);
};
