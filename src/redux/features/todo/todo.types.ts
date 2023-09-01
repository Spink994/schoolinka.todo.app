export interface Todo {
	userId: number;
	id: number;
	title: string;
	todoDate: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
	time: {
		startTime: string;
		endTime: string;
	};
}
