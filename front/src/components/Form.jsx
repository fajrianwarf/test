import React from 'react';

export default function Form({
  onSend,
  formData,
  setFormData,
  error,
  edit,
  close,
}) {
  return (
    <form className='flex flex-col border px-4 py-4 my-2 rounded-md gap-y-2'>
      <div className='flex flex-col'>
        <div className='flex justify-between mb-1'>
          <label htmlFor='title'>Title</label>
          <button
            className='text-red-700 hover:bg-red-300 border rounded-md px-2 py-0.5'
            onClick={close}
          >
            x
          </button>
        </div>
        <input
          type='text'
          id='title'
          className='border px-2 py-1'
          placeholder='title'
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          id='category'
          className='border px-2 py-1'
          placeholder='category'
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          className='border px-2 py-1'
          placeholder='content'
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='status'>Status</label>
        <select
          name='status'
          id='status'
          className='border px-2 py-1 w-full'
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value='' selected disabled hidden>
            Choose here
          </option>
          <option value='publish' className='w-full'>
            publish
          </option>
          <option value='draft' className='w-full'>
            draft
          </option>
          {edit && (
            <option value='thrash' className='w-full'>
              thrash
            </option>
          )}
        </select>
      </div>
      <button className='border py-1 bg-green-300' onClick={onSend}>
        {edit ? 'Edit' : 'Add'}
      </button>
      <p className='text-red-600'>{error}</p>
    </form>
  );
}
