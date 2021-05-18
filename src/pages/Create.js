import React, {useState} from 'react'
import {
    Button,
    ButtonGroup,
    Container,
    Typography,
    makeStyles,
    TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {useHistory} from "react-router";


const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

export default function Create() {

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [category, setCategory] = useState('todos')

    const history = useHistory()

    const classes = useStyles()

    const handleSubmit = (e) => {
        e.preventDefault()
        setTitleError(false)
        setDetailsError(false)


        if(title == '') {
            setTitleError(true)
        }
        if(details == '') {
            setDetailsError(true)
        }

        if (title && details) {
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({title, details, category})
            }).then(()=> history.push('/'))
        }
    }


  return (
<Container>
    <Typography
            className={classes.title}
            variant="h6"
            component={'h2'}
            gutterBottom
            color={"textSecondary"}
        >
            Create a New note
    </Typography>

    <form noValidate autoComplete={'off'} onSubmit={handleSubmit}>
                <TextField
                    onChange={(e)=>{setTitle(e.currentTarget.value)}}
                    className={classes.field}
                    label={'Note Title'}
                    variant={'outlined'}
                    color={"secondary"}
                    required
                    fullWidth
                    error={titleError}

                />
                <TextField
                    onChange={(e)=>{setDetails(e.currentTarget.value)}}
                    className={classes.field} label={'Details'}
                    variant={'outlined'} color={"secondary"}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    error={detailsError}
                />

        <FormControl className={classes.field}>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup value={category} onChange={(e)=> {setCategory(e.currentTarget.value)}}>
            <FormControlLabel value={'money'} control={<Radio/>} label={'Money'} />
            <FormControlLabel value={'todos'} control={<Radio/>} label={'Todos'} />
            <FormControlLabel value={'reminder'} control={<Radio/>} label={'Reminder'} />
            <FormControlLabel value={'work'} control={<Radio/>} label={'Work'} />
            </RadioGroup>
        </FormControl>

            <Button
                    type={'submit'}
                    color={"secondary"}
                    variant={"contained"}
                    endIcon={<SendIcon/>}
                > Submit
            </Button>
    </form>


</Container>
  )
}
