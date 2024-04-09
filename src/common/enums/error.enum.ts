export const enum PaginationError {
	TITLE = 'Pagination Error',
	PAGINATION_FAILURE = 'The pagination has failed to filter data !'
}

export const enum PostgresError {
	TITLE = 'PostgreSQL Query Error',
	PAGINATION_FAILURE = 'The pagination has failed to filter data !'
}

export const enum AuthError {
	TITLE = 'Unauthorized',
	INVALID_TOKEN = 'Your token is invalid !',
	INVALID_PERMISSION = 'You do not have permissions !',
	INVALID_USER = 'Invalid email or password !'
}

export const enum ForbiddenAuthError {
	TITLE = 'Unauthorized',
	NOT_FOUND_TOKEN = 'Not found session !',
	NOT_FOUND_REFRESH_TOKEN = 'Not found current session !'
}
