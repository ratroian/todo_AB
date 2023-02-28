import axios from 'axios';
import React from 'react';
import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';
import { Task } from '../Task/Task';
import { Link } from 'react-router-dom';

export const Tasks = ({
	list,
	onEditTitle,
	onAddTask,
	withoutEmpty,
	onRemoveTask,
	onEditTask,
	onCompleteTask,
}) => {
	const editTitle = () => {
		console.log();
		const newTitle = window.prompt('Название списка', list.name);
		if (newTitle) {
			onEditTitle(list.id, newTitle);
			axios
				.patch('http://localhost:3001/lists/' + list.id, {
					name: newTitle,
				})
				.catch(() => {
					alert('Не удалось обновить название списка');
				});
		}
	};

	return (
		<div className='tasks'>
			<div className='tasks__title-wrapper'>
				<h2 className='tasks__title' style={{ color: list.color.hex }}>
					{list.name}
				</h2>
				<img
					src={editSvg}
					alt='edit'
					onClick={() => {
						editTitle();
					}}
				/>
			</div>
			<ul className='tasks__list'>
				{!withoutEmpty && list.tasks && !list.tasks.length && (
					<h3 className='tasks__empty'>Задачи отсутствуют</h3>
				)}
				{list.tasks &&
					list.tasks.map((task) => (
						<Task
							{...task}
							key={task.id}
							onRemove={onRemoveTask}
							onEdit={onEditTask}
							list={list}
							onComplete={onCompleteTask}
						/>
					))}
			</ul>
			<AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
		</div>
	);
};
