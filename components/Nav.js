import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Nav() {
    function logoutHandler(e) {
        e.preventDefault();

        Cookie.remove('token');

        Router.replace('/auth/login');
    }

    return (
        <>
            <Link href="/posts"><a>Posts</a></Link>
            &nbsp; | &nbsp;
            <Link href="/posts/create"><a>Create Post</a></Link>
            &nbsp; | &nbsp;
            <a href="#" onClick={logoutHandler.bind(this)}>Logout</a>
        </>
    );
}
