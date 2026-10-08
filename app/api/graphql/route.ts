import { createPortfolioYoga } from "@/lib/yoga";

const yoga = createPortfolioYoga();

const handler = (request: Request) => yoga.handleRequest(request, {});

export { handler as GET, handler as POST, handler as OPTIONS };
