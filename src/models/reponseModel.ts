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
}

export type { ReponseDeleteSuccess, PaginationModel };
