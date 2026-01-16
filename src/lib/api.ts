import { getAccessToken } from "../services/auth-storage";
import { client } from "./api-openapi-gen/client.gen";

client.setConfig({
	baseUrl: "http://localhost:8080",
});

client.interceptors.request.use(async (request, _options) => {
	const token = await getAccessToken();
	request.headers.set("Authorization", `Bearer ${token}`);
	return request;
});

export * as api from "./api-openapi-gen/sdk.gen";
