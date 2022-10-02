export interface Customer {
	name: string;
	title: string;
	customer: string;
	background: string;
	goal: string;
	contribution: {
		intro: string;
		topics: {
			title: string;
			body: string;
		}[];
	};
	technologies: string[];
	quote: {
		stakeholder: {
			name: string;
			role: string;
		};
		body: string;
	};
}
