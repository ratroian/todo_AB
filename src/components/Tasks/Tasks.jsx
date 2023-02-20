import React from 'react';
import editSvg from '../../assets/img/edit.svg';
import './Tasks.scss';

export const Tasks = ({ list }) => {
	console.log('list', list);
	return (
		<div className='tasks'>
			<div className='tasks__title-wrapper'>
				<h2 className='tasks__title'>{list.name}</h2>
				<img src={editSvg} alt='edit' />
			</div>
			<ul className='tasks__list'>
				{list.tasks.map((task) => {
					return (
						<li key={task.id} className='tasks__item'>
							<div className='checkbox'>
								<input id={`task-${task.id}`} type='checkbox' />
								<label htmlFor={`task-${task.id}`}>
									<svg
										width='11'
										height='8'
										viewBox='0 0 11 8'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001'
											stroke='black'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</label>
							</div>
							<input readOnly value={task.text} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};
