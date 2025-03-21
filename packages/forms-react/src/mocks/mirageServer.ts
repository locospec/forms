import { Response, createServer } from "miragejs";
import { person } from "@jsonforms/examples";
import { SCHEMA, UI_SCHEMA } from "./config";

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = "/api/data-bench";

      // Mocking the /config endpoint
      this.post("/:resource/_config", (_, request) => {
        const resource = request.params.resource;
        if (resource === "sample") {
          return {
            name: "create_asset_type",
            type: "action",
            dbOp: "insert",
            model: "asset_type",
            label: "Create Asset Type",
            attributes: {
              name: {
                type: "string",
                label: "Name",
                validations: [
                  {
                    type: "required",
                    message: "Name is required",
                  },
                  {
                    type: "regex:/^[a-zA-Z0-9 ]+$/",
                    message: "Name should match the regex",
                  },
                ],
              },
            },
            schema: SCHEMA,
            uischema: UI_SCHEMA,
            initialData: person.data,
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });

      this.post("/:resource/:model/_insert", (_, request) => {
        const resource = request.params.resource;
        const model = request.params.model;
        const body = JSON.parse(request.requestBody);

        if (resource === "sample") {
          return {
            success: true,
            msg: `New Record Created in ${model}`,
            data: body,
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });

      this.post("/:resource/:model/_update", (_, request) => {
        const resource = request.params.resource;
        const model = request.params.model;
        const body = JSON.parse(request.requestBody);

        if (resource === "sample") {
          return {
            success: true,
            msg: `Record Updated in ${model}`,
            data: body,
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });

      this.post("/:resource/_read_relation_options", (_, request) => {
        const resource = request.params.resource;

        const body = JSON.parse(request.requestBody);
        const { filters, relation, pagination } = body;
        const { cursor } = pagination;
        const dataSource = relation;
        const pageSize = 20;
        const processed = JSON.stringify(filters);

        if (
          resource === "auction-data" ||
          resource === "auction-data-2" ||
          resource === "auction-data-3"
        ) {
          let completeTestData: any = [];

          completeTestData = Array.from({ length: 200 }, (_, index) => ({
            // label: dataSource + "[" + processed + "]" + index,
            // value: dataSource + "_" + index,
            title: dataSource + "[" + processed + "]" + index,
            const: dataSource + "_" + index,
          }));

          const paginatedTestData = completeTestData.slice(
            cursor,
            cursor + pageSize
          );
          const nextCursor =
            cursor + pageSize < completeTestData.length
              ? cursor + pageSize
              : null;
          const meta = {
            count: 2,
            per_page: pageSize,
            has_more: null,
            next_cursor: nextCursor,
            prev_cursor: null,
          };
          return {
            success: true,
            data: paginatedTestData,
            meta: meta,
          };
        }

        return new Response(404, {}, { message: "Resource not found" });
      });
    },
  });

  return server;
}
