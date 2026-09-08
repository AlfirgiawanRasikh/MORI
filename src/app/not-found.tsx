import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page-width section-space">
      <p className="eyebrow">MORI</p>
      <h1 className="section-heading">Let’s find a quieter way back.</h1>
      <p className="body-copy mt-6 mb-8">This page isn’t here.</p>
      <Link className="button" href="/">
        Return to MORI
      </Link>
    </main>
  );
}
