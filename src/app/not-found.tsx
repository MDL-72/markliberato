import Link from 'next/link';

export default function NotFound() {
    return (
        <main id="main" tabIndex={-1} className="shell page">
            <p className="mono breadcrumb">404</p>
            <h1>That page is not here</h1>
            <p className="lede">
                The link may be old, or the entry may never have been published. Everything that does exist is one of
                these.
            </p>
            <ul className="link-list">
                <li>
                    <Link className="text-link" href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="text-link" href="/#lab">
                        Experiments
                    </Link>
                </li>
                <li>
                    <Link className="text-link" href="/#work">
                        Work
                    </Link>
                </li>
            </ul>
        </main>
    );
}
