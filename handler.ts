import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import { ServerUtils } from "src/server/ServerUtils";

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    if (ServerUtils.isSitemapPathValid(event.path)) {
      const res = await ServerUtils.getSitemap();

      const resObj = {
        statusCode: 200,
        headers: { "content-type": "application/xml" },
        body: res,
      };

      return resObj;
    }

    // We use asynchronous import here so we can better catch server-side errors during development
    const render = (await import("./src/server/render")).default;
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: (await render(event)) as unknown as string,
    };
  } catch (error) {
    // Custom error handling for server-side errors
    // TODO: Prettify the output, include the callstack, e.g. by using `youch` to generate beautiful error pages
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `<html><body>${error.toString()}</body></html>`,
    };
  }
};
