export interface errorProps {
  error: number;
}

export function Error({ error = 404 }: errorProps) {
  return (
    <div className="not-found">
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Page not found</h3>
          <h1>
            <span>{error}</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </div>
  );
}
