export enum RedisErrorMessage {
	DELETE_FAILURE = 'Redis has been failed to delete the cache !',
	GET_FAILURE = 'Redis has been failed to get the cache !',
	SET_FAILURE = 'Redis has been failed to set the cache !',
	SETNX_FAILURE = 'Redis has been failed to set nx the cache !',
	GET_PREFIX_FAILURE = 'Redis has been failed to get the cache by prefix !',
	CHECK_EXISTS_FAILURE = 'Redis has been failed to check key is existed !'
}
