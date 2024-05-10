import { useRouteError } from "react-router-dom";

export default function ErrorPages() {
  const error:any = useRouteError();

  return (
    <div id="error-page">
      <p className="text-2xl font-bold">404</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
