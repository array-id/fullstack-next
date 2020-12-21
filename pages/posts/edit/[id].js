import React, { useState } from 'react';
import { authPage } from '../../../middlewares/authorizationPage';
import Router from 'next/router';
import Nav from '../../../components/Nav';

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx);

    const { id } = ctx.query;

    const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const res = await postReq.json();

    return {
        props: {
            token,
            post: res.data
        }
    }
}

export default function PostEdit(props) {
    const { post } = props;

    const [ fields, setFields ] = useState({
        title: post.title,
        content: post.content
    });

    const [ status, setStatus ] = useState('normal');

    async function updateHandler(e) {
        e.preventDefault();
    
        setStatus('loading');

        const { token } = props;

        const update = await fetch('/api/posts/update/' + post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if(!update.ok) return setStatus('error');

        const res = await update.json();

        setStatus('success');

        Router.push('/posts');
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name');
       
        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    return (
        <div>
            <h1>Edit a Post</h1>

            <Nav />
        
            <p>Post ID: {post.id}</p>

            <form onSubmit={updateHandler.bind(this)}>
               <input
                    onChange={fieldHandler.bind(this)}
                    type="text" 
                    placeholder="Title" 
                    name="title" 
                    defaultValue={post.title}
                />
                <br />
                <textarea
                    onChange={fieldHandler.bind(this)}
                    placeholder="Content" 
                    name="content" 
                    defaultValue={post.content}
                ></textarea>
                <br />
                
                <button type="submit">
                    Save Changes 
                </button>

                <div>
                    Status: {status}
                </div>
            </form>
        </div>
    );
}
