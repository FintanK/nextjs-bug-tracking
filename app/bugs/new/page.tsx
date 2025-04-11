'use client';

import { createBugSchema } from '@/app/api/bugs/createBugSchema';
import Spinner from '@/app/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type NewBugForm = z.infer<typeof createBugSchema>;

const NewBugPage = () => {

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors } } = useForm<NewBugForm>({
        resolver: zodResolver(createBugSchema)
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post('/api/bugs', data);
            router.push('/bugs');
        } catch (error) {
            setIsSubmitting(false);
            setError('An unexpected error occured');
        }
    });

    return (
        <div className="max-w-xl">
            {error && <Callout.Root color="red" className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={onSubmit}>
                {errors.title && <Text color="red">{errors.title.message}</Text>}
                <TextField.Root placeholder="Title" {...register('title')} />
                {errors.description && <Text color="red">{errors.description.message}</Text>}
                <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder='Description' {...field}></SimpleMDE>}></Controller>
                <Button disabled={isSubmitting}>Submit New Bug{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewBugPage
