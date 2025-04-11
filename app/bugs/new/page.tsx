'use client';

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';


const NewBugPage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title' />
            <SimpleMDE placeholder='Description'></SimpleMDE>
            <Button>Submit New Bug</Button>
        </div>
    )
}

export default NewBugPage
