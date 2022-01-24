import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const Contatos = () => {
    const [open, setOpen] = React.useState(false);
    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    //const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function main() {
            const response = await axios.get(url)
            const data = response.data
            setMessage(data);
        }
        main()
    }, [render])

    const sendMessage = () => {
        setOpen(false);
        if (author.length <= 0 || content.length <= 0) {
            return setOpen(!open)
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        axios.post(url, {...bodyForm}).then((res) => {
                if (res.data.id) {
                    setRender(true);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000)
                }
            })

        setAuthor('');
        setContent('');

        console.log(content)
    }

    return (
        <>
            <Grid style={{marginTop:10}} container direction="row" xs={12} >
                <TextField id="name" label="Nome" value={author} onChange={(event) => { setAuthor(event.target.value) }} fullWidth />
                <TextField style={{
                    marginTop:10
                }} id="message" label="Mensagem" value={content} onChange={(event) => { setContent(event.target.value) }} fullWidth />
            </Grid>
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                    <Alert
                    style={{marginTop:10}}
                    severity='warning'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Por favor preencha todos os campos!
                    </Alert>
                </Collapse>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Collapse in={success}>
                    <Alert
                    style={{marginTop:10}}
                    severity='success'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccess(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Mensagem foi enviada
                    </Alert>
                </Collapse>
            </Box>

            <Button onClick={sendMessage} className="mt-2" variant="contained" color="primary">
                Enviar
            </Button>

            {message.map((content) => {
                return (
                    <Box style={{borderBottom: '1px solid black'}} key={content.id}>
                        <div className="card-body">
                            <h5 className="card-title">{content.email}</h5>
                            <p className="card-text">{content.message}</p>
                            <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                        </div>
                    </Box>
                )
            })}
        </>
    )
}

export default Contatos;
