const response = {
  // for success execution
	success: (res, payload) => {
		const {
			code,
			status,
			message,
			data,
		} = payload;

		const response = {
			code: code || 200,
			success: status || false,
			message,
			data
		};

		res.status(code).json(response);
	},
  // for failed execution
	failed: (res, payload) => {
		const { code, status, message, error } = payload;

		const response = {
			code: code || 500,
			success: status || false,
			message,
			error
		};

		res.status(code).json(response);
	}
}

module.exports = response;
