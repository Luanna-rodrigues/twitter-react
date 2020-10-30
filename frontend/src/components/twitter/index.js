import React, { useState, useEffect } from 'react'
import * as api from '../../cliente/api';
import './style.css'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';

const Twitter = () => {
    const [data, setData] = useState([])
    const [value, setValue] = React.useState("");

    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    });

    const keydownHandler = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) twitar()
    }

    const getAll = async () => {
        const tweets = await api.getAll()
        setData(tweets)
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const twitar = () => {
        if (value) {
            const id = uuidv4()
            setData([...data, { id, value }])
            setValue("")
        }
    }

    const deleteItem = (id) => {
        const items = data.filter(item => item.id !== id)
        setData(items)
    }

    return (
        <>
            <Container maxWidth="sm">
                <section className="body-twitter">
                    <Grid item xs={12}>
                        <textarea
                            id="noter-text-area"
                            placeholder="bora twitar ;)"
                            name="textarea"
                            value={value}
                            onChange={handleChange}
                            maxLength="280"
                            rows="8" 
                            cols="50" />
                    </Grid>
                    <Grid item xs={12}>
                        <span>{`${280 - value.length} caracter(es) restante(s)`}</span>
                    </Grid>
                    <Grid item xs={12} container justify="flex-end">
                        <Button
                            disabled={value.length === 0}
                            onClick={twitar}
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                            className="button-allign">
                            twitar
                        </Button>
                    </Grid>
                </section>
                <ul>
                    {data.length > 0 &&
                        (data.map(({ id, value }, index) => {
                            return (
                                <li key={id}>
                                    <h5>{value}</h5>
                                    <Grid container justify="flex-end">
                                        <a onClick={() => deleteItem(id)}><DeleteIcon style={{ color: red[800] }} /></a>
                                    </Grid>
                                </li>
                            )
                        }))}

                    {data.length === 0 && (
                        <Grid item xs={12}>
                            <h5>nenhuma mensagem!!!</h5>
                        </Grid>
                    )}

                </ul>

            </Container>
        </>
    )
}

export default Twitter