interface ReponseDeleteSuccess {
	id?: string;
	message?: string;
}

interface PaginationModel {
	id?: string;
	page?: number;
	offset?: number;
	limit?: number;
	total?: number;
	totalNew?: number;
}

export type { ReponseDeleteSuccess, PaginationModel };
