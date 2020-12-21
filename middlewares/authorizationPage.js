import cookies from 'next-cookies';

export function unauthPage(ctx) {
    return new Promise(resolve => {
        const allCookies = cookies(ctx);

        if(allCookies.token)
            return ctx.res.writeHead(302, {
                Location: '/posts'
            }).end();

        return resolve('unauthorized');
    });
}

export function authPage(ctx) {
    return new Promise(resolve => {
        const allCookies = cookies(ctx);

        if(!allCookies.token)
            return ctx.res.writeHead(302, {
                Location: '/auth/login'
            }).end();

        return resolve({
            token: allCookies.token
        });
    });
}
