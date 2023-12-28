export const HTTP_STATUS_CODE = {
    not_found: 404,
    found: 403,
    unauthorized: 401,
    bad_request: 400,
    success: 200,
    create_success: 201,
    internal_error: 500,
};

export const ACTIVE = 1
export const DE_ACTIVE = 0


export const PAGE = 1
export const PAGE_LIMIT = 10

export const BASE_URL = "https://" + process.env.SERVER_URL + '/'