import {
	FiBell,
	FiCalendar,
	FiMinus,
	FiPlus,
	FiSettings,
} from 'react-icons/fi';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import ProfileImage from '@/assets/svgs/images/profileImage.svg';
import { Button } from '../common';
import {
	handleShowAddTodo,
	handleShowToDoPopUp,
} from '@/redux/features/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import Calendar from '../Calendar';
import { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import useStopScrolling from '@/hooks/useStopScrolling';

const AppTopNav = () => {
	const dispatch = useAppDispatch();
	const [showCalendar, setShowCalendar] = useState<boolean>(false);
	const [isHidden, setIsHidden] = useState<boolean>(true);

	useStopScrolling({ isOpen: isHidden });

	const { viewTodo, showEditTodo, showTodoPopUp } = useAppSelector(
		(state) => state.todo
	);

	return (
		<header className="sticky top-0 z-[70] max-h-[72px] w-full border-b bg-white  py-4">
			<div className="mx-auto flex max-w-[1440px] items-center justify-between px-[4%]">
				{/* Title */}
				<h5 className="text-primary-1 text-2xl font-bold">ToDo</h5>

				{/* header navigations */}
				<div className="hidden items-center gap-8 [@media(min-width:1020px)]:flex">
					<a href="#">
						<FiSettings className="text-[20px]" />
					</a>
					<a href="#">
						<FiBell className="text-[20px]" />
					</a>
					<div>
						<img
							src={ProfileImage}
							alt="profile picture of a beautiful lady"
						/>
					</div>
				</div>

				{/* For mobile view only */}
				<div className="flex items-center gap-8 [@media(min-width:1020px)]:hidden">
					<Button
						disabled={viewTodo || showEditTodo}
						onClick={() => {
							dispatch(
								handleShowToDoPopUp({ status: !showTodoPopUp })
							);
							dispatch(handleShowAddTodo({ status: true }));
						}}
						className="max-w-[46px] disabled:pointer-events-none disabled:opacity-30"
					>
						<FiPlus className="min-w-[24px] text-xl" />
					</Button>

					<button onClick={() => setIsHidden(false)}>
						<HiOutlineMenuAlt1 className="text-[24px]" />
					</button>
				</div>
			</div>

			{/* Mobile navbar */}
			<div
				aria-hidden={isHidden}
				className="fixed left-0 top-0 z-[120] flex h-screen w-screen flex-col justify-between gap-y-6 overflow-auto bg-white p-6 pt-12 transition-transform [&[aria-hidden='true']]:translate-x-[120vw] [@media(min-width:1020px)]:hidden"
			>
				<button
					onClick={() => setIsHidden(true)}
					className="fixed right-4 top-4"
				>
					<GrFormClose className="text-[24px]" />
				</button>

				<div className="flex flex-col items-start gap-8">
					<a
						className="flex items-center gap-2"
						href="#"
					>
						<FiSettings className="text-[20px]" />{' '}
						<span>Settings</span>
					</a>
					<a
						className="flex items-center gap-2"
						href="#"
					>
						<FiBell className="text-[20px]" />
						<span>Notification</span>
					</a>

					<a
						onClick={() => setShowCalendar(!showCalendar)}
						className="mb-1 flex items-center gap-2"
						href="#"
					>
						<FiCalendar className="text-[20px]" />
						<span>Calendar</span>{' '}
						{showCalendar ? (
							<FiMinus className="text-[20px]" />
						) : (
							<FiPlus className="text-[20px]" />
						)}
					</a>

					{showCalendar && <Calendar />}
				</div>

				<div className="mt-6 flex h-max items-center gap-2">
					<img
						src={ProfileImage}
						alt="profile picture of a beautiful lady"
					/>
					<span>Alisha Merchant</span>
				</div>
			</div>
		</header>
	);
};

export default AppTopNav;
