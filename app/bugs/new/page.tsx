'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';


interface BugForm {
    title: string,
    description: string
}

const NewBugPage = () => {

    const router = useRouter();
    const { register, control, handleSubmit } = useForm<BugForm>();

    const [error, setError] = useState('')
    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/bugs', data);
                    router.push('/bugs');
                } catch (error) {
                    setError('An unexpected error occured');
                }
            })}>
                <TextField.Root placeholder="Title" {...register('title')} />
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>}></Controller>
                <Button>Submit New Bug</Button>
            </form>
        </div>
    )
}

export default NewBugPage
