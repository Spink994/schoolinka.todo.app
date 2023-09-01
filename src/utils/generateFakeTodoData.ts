import { Todo } from '@/redux/features/todo/todo.types';

const todos: Todo[] = [];

const todoTitles = [
	'Buy groceries',
	'Read a chapter of a book',
	'Call a friend',
	'Go for a run',
	'Complete work presentation',
	'Pay bills',
	'Clean the house',
	'Write in a journal',
	'Attend a meeting',
	'Plan weekend activities',
	'Study for an exam',
	'Water the plants',
	'Update resume',
	'Research vacation destinations',
	'Organize closet',
	'Prepare dinner',
	'Start a new project',
	'Practice a musical instrument',
	'Watch a documentary',
	"Schedule doctor's appointment",
	'Try a new recipe',
	'Write thank-you notes',
	'Learn a new recipe',
	'Declutter workspace',
	'Take a walk outside',
	'Create a budget',
	'Yoga or meditation',
	'Volunteer for a cause',
	'Plan a surprise',
	'Explore a new hobby',
	'Review monthly goals',
	'Take online course',
	'Clean out the fridge',
	'Write a blog post',
	'Visit a museum',
	'Family game night',
	'Set up a savings plan',
	'Research investment options',
	'Go to the gym',
	'Update social media profiles',
	'Attend a workshop',
	'Write a short story',
	'Visit a farmers market',
	'Plan home DIY project',
	'Learn a dance routine',
	'Practice mindfulness',
	'Try a new workout',
	'Experiment with cooking',
	'Sort through old clothes',
	'Create a reading list',
	'Plan a picnic',
	'Visit a local park',
	'Learn a new language',
	'Write a heartfelt letter',
	'Explore nearby trails',
	'Plan a digital detox',
	'Try a new art technique',
	'Research investment options',
	'Volunteer at a shelter',
	'Rearrange furniture',
	'Watch a classic movie',
	'Start a gratitude journal',
	'Organize digital files',
	'Attend a networking event',
	'Plan a weekend getaway',
	'Visit a botanical garden',
	'Create a vision board',
	'Learn coding basics',
	'Plan a themed party',
	'Try a new coffee shop',
	'Explore photography',
	'Set up an exercise routine',
	'Listen to a podcast',
	'Visit a historical site',
	'Start a home garden',
	'Write a poem',
	'Explore a new genre of music',
	'Plan a home spa day',
	'Practice public speaking',
	'Watch a TED talk',
	'Research online courses',
	'Attend a live performance',
	'Paint or draw something',
	'Plan a family outing',
	'Write down life goals',
	'Explore local landmarks',
	'Set up a home workspace',
	'Try a new hairstyle',
	'Volunteer for community service',
	'Plan a movie marathon',
	'Create a morning routine',
	'Experiment with cooking',
	'Visit an art gallery',
	'Practice a sport',
	'Plan a tech-free day',
	'Learn to knit or crochet',
	'Organize digital photos',
	'Attend a cooking class',
	'Explore a nearby city',
	'Plan a book club meeting',
];

/**
 * Disclaimer: This function is not exactly needed anymore,
 * but i left it here just to show how i was able to generate my todos with the help of chatGPT.
 */

for (let i = 1; i <= 100; i++) {
	const randomDays = Math.floor(Math.random() * 15);
	const createdAt = new Date(
		Date.now() + randomDays * 24 * 60 * 60 * 1000
	).toISOString();
	const updatedAt = createdAt;

	const startTime = Math.floor(Math.random() * 22) + 1;
	const endTime = startTime + 1;

	const todo = {
		userId: Math.floor(Math.random() * 23) + 1,
		id: i,
		title: todoTitles[i],
		completed: [true, false][Math.floor(Math.random() * 2)],
		todoDate: createdAt,
		createdAt,
		updatedAt,
		time: {
			startTime: `${startTime}:00`,
			endTime: `${endTime}:00`,
		},
	};

	todos.push(todo);
}

export default todos;
