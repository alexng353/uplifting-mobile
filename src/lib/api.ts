import { client } from "./api-openapi-gen/client.gen";

client.setConfig({
	baseUrl: "http://localhost:8080",
	// credentials: "include",
});

export * as api from "./api-openapi-gen/sdk.gen";
