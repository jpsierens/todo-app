import fetch from 'isomorphic-fetch';

const TODOS_URL = 'http://localhost:3001/todos';

export async function getTodos() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(TODOS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function postTodo(todo) {
    try {
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        };

        const response = await fetch(TODOS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}
