import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound">
      <div>
        <p className="h-display">404</p>
        <h1 className="h-3" style={{ marginTop: 16 }}>
          Страница не найдена · Бет табылмады
        </h1>
        <p style={{ margin: "28px 0 0" }}>
          <Link className="btn" href="/">
            На главную
          </Link>
        </p>
      </div>
    </section>
  );
}
