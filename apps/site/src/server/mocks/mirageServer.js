import { Response, createServer } from "miragejs";

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "/api/data-bench";

      // Mocking the /config endpoint
      this.get("/:resource/config", (schema, request) => {
        const resource = request.params.resource;

        if (resource === "test-data") {
          return {
            resource: "test-data",
            identifierKey: "data-value",
            columns: [
              { accessorKey: "id", header: "ID", width: 50 },
              { accessorKey: "name", header: "name", width: 500 },
              { accessorKey: "data-value", header: "data-value" },
            ],
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });

      // Mocking the /fetch endpoint
      this.get("/:resource/fetch", (schema, request) => {
        const resource = request.params.resource;
        const cursor = Number(request.queryParams.cursor) || 0;
        const search = request.queryParams.search || "";
        const pageSize = 20;

        if (resource === "test-data") {
          const completeTestData = Array.from({ length: 200 }, (_, index) => ({
            id: index + 1,
            name: `Test Data ${index + 1}`,
            "data-value": `Value${index + 1}`,
          }));

          const paginatedTestData = completeTestData.slice(
            cursor,
            cursor + pageSize
          );
          const nextCursor =
            cursor + pageSize < completeTestData.length
              ? cursor + pageSize
              : null;

          return {
            data: paginatedTestData,
            next_cursor: nextCursor,
            total: completeTestData.length,
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });
    },
  });

  return server;
}
