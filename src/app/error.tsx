"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h1>Ocurrió un error</h1>
      <p>{error.message}</p>
    </div>
  );
}
