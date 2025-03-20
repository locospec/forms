import { Response, createServer } from "miragejs";
import { sample_view_config } from "./config";
import { new_config } from "./newConfig";
import { person } from "@jsonforms/examples";

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
            schema: person.schema,
            uischema: person.uischema,
            initialData: person.data,
          };
        }

        if (resource === "auction-data" || resource === "auction-data-2") {
          return sample_view_config;
        }
        if (resource === "auction-data-3") {
          return new_config;
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

      // Mocking the /fetch endpoint
      this.post("/:resource/_read", (_, request) => {
        const resource = request.params.resource;

        const body = JSON.parse(request.requestBody);
        const { search, pagination, ...rest } = body;
        const { cursor } = pagination;

        const pageSize = 10;
        const filters = JSON.stringify(rest.filters);

        if (
          resource === "auction-data" ||
          resource === "auction-data-2" ||
          resource === "auction-data-3"
        ) {
          const completeTestData = Array.from({ length: 200 }, (_, index) => ({
            id: index + 1,
            state: `State ${index + 1}`,
            district: `District ${index + 1}`,
            cities: `City ${index + 1}`,
            current_users: Math.floor(Math.random() * 1000),
            locality: `Locality ${index + 1}`,
            properties: `Property ${index + 1} ${filters} q=${search}`,
            "state.id": `state_${index + 1}`,
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
